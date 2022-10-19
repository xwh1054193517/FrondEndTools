<template>
<div  id="app">
  <div class="inp">
  <input type="file" @change="handleFileChange"/>
  <el-button @click="handleUpload">upload</el-button>
  
  <el-button v-if="status === Status.pause" @click="handleResume">resume</el-button>
  <el-button v-else @click="handlePause">pause</el-button>
  <el-button @click="handleDelete">delete</el-button>
  </div>
  <div class="progress">
    <div>
        <div>calculate chunk hash</div>
        <el-progress :percentage="hashPercentage"></el-progress>
      </div>
    <div>
    <div>Total Percentage</div>
    <el-progress :percentage="fakeUploadProgress"></el-progress>
    </div>
    
  </div>
  <el-table :data="data">
    <el-table-column prop="hash"  label="chunk hash" align="center"></el-table-column>
    <el-table-column label="size(KB)" align="center" width="120">
      <template v-slot="{ row }">
          {{ row.size | transformByte }}
        </template>
    </el-table-column>
    <el-table-column label="percentage" align="center">
        <template v-slot="{ row }">
          <el-progress
            :percentage="row.percentage"
            color="rgb(39,235,45)"
          ></el-progress>
        </template>
      </el-table-column>
  </el-table>
 
</div>

</template>

<script>


//切片大小
const SIZE=10*1024*1024;
const Status = {
  wait: "wait",
  pause: "pause",
  uploading: "uploading"
};

export default{
  name:"app",
  filters:{
    transformByte(num){
      return parseInt((num/1024).toFixed(0))
    }
  },
  data(){
    return {
      Status,
      container:{
        file:null,
        hash:"",
        worker:null
      },
      //文件切片数组 
      data:[],
      requestList: [],
      hashPercentage:0,
    // 当暂停时会取消 xhr 导致进度条后退
    // 为了避免这种情况，需要定义一个假的进度条
      fakeUploadProgress:0,
      curHash:0,
      status:Status.wait
    }
  },
  computed:{
    uploadPercentage(){
      if(!this.container.file||!this.data.length)return  0
      const loaded=this.data.map(item=>item.size*item.percentage).reduce((acc,cur)=>acc+cur);
      // console.log(loaded,this.container.file.size);
      // (0-100)*size /size
      return  parseInt((loaded/this.container.file.size).toFixed(2))
    }
  },
  watch:{
    uploadPercentage(now){
      if(now>this.fakeUploadProgress){
        this.fakeUploadProgress=now
      }
    }
  },
  methods:{
    handlePause(){
      this.status=Status.pause
      this.resetData()
    },
    async handleResume(){
      this.status=Status.uploading
      const {uploadedList}=await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      )
      await this.uploadChunk(uploadedList)
    },
        //中断请求，清除绑定事件
    resetData(){
      this.requestList.forEach(xhr=>xhr?.abort())
      this.requestList=[]
      if(this.container.worker){
        this.container.worker.onmessage=null
      }
    },
    //封装xhr请求
    request(
      {
      url,
      method="post",
      data,headers={},
      requestList,
      onProgress=e=>e
      }){
      return new Promise(res=>{
        const xhr=new XMLHttpRequest()
        xhr.upload.onprogress=onProgress
        xhr.open(method,url);
        Object.keys(headers).forEach(key=>{
          xhr.setRequestHeader(key,headers[key])
        })
        xhr.send(data)
        xhr.onload=e=>{
          if(requestList){
             // 将请求成功的 xhr 从列表中删除
            const xhrIndex=requestList.findIndex(item=>item===xhr)
            requestList.splice(xhrIndex,1)
          }
          res({
            data:e.target.response
          })
        }
         // 暴露当前 xhr 给外部
        requestList?.push(xhr)
      })
    },

       //文件切片
    createFileChunk(file,size=SIZE){
      const fileChunkList=[];
      let cur=0
      while(cur<file.size){
        fileChunkList.push({file:file.slice(cur,cur+size)});
        cur+=size
      }
      // console.log(fileChunkList);
      return fileChunkList
    },

    //用webworker生成hash
    calculateHash(fileChunkList){
      return new Promise(resolve=>{
        this.container.worker=new Worker('/hash.js')
        this.container.worker.postMessage({fileChunkList})
        this.container.worker.onmessage=(e)=>{
          const {percentage,hash}=e.data
          this.hashPercentage=percentage
          if(hash){
            resolve(hash)
          }
        }
      })
    },


    //输入文件
     handleFileChange(e){
      const [file]=e.target.files
      if(!file)return
      this.resetData()
      Object.assign(this.$data,this.$options.data())
      this.container.file=file;   
    },
    


    async handleUpload(){
      if(!this.container.file)return
      this.status=Status.uploading
      //分割文件
      const fileChunkList=this.createFileChunk(this.container.file)

      // 计算文件独有的hash
      this.container.hash=await this.calculateHash(fileChunkList)
      console.log("fileHash:",this.container.hash);

      // // 验证文件
      const {shouldUpload,uploadedList}=await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      )

      //已经上传的切片
      console.log("uploadList:",uploadedList);
      console.log("shouldUpload:",shouldUpload);
      if (!shouldUpload) {
        this.$message.success("skip upload:file upload success");
        this.status=Status.wait
        return;
      }

      this.data=fileChunkList.map(({file},index)=>({
        chunk:file,
         //分片hash名 带下标
        hash:this.container.hash+"-"+index,
        size:file.size,
        index,
        //整个文件的hash
        fileHash:this.container.hash,
        //进度 
        percentage:0
      }))
    //   // console.log(this.data);
     await this.uploadChunk(uploadedList)
    },

    //上传切片
    async uploadChunk(uploadedList=[]){
      const requestList=this.data
      .filter(({hash})=>!uploadedList.includes(hash))
      .map(({chunk,hash,index})=>{
        const formData=new FormData()
        formData.append("chunk",chunk)
        formData.append("hash",hash)
        formData.append("filename",this.container.file.name)
        formData.append("fileHash",this.container.hash)
        return {formData,index}
      }).map(({formData,index})=>
      //这里返回的是一个函数 还没执行 别加了大括号 加了就立即执行了 
      //如果加了大括号  那么下面的promise.all将会失效
        this.request({
          url:"http://localhost:3000",
          data:formData,
          onProgress:this.createProgressHandler(this.data[index]),
          requestList:this.requestList
        })
      );
      //并发请求
      await Promise.all(requestList)
      console.log(uploadedList.length,requestList,this.data.length);
      // 之前上传的切片数量 + 本次上传的切片数量 = 所有切片数量时合并切片
      if(uploadedList.length+requestList.length===this.data.length){
        console.log('该合并了');
        await this.mergeRequest()
      }
     
    },

        //合并切片请求
    async mergeRequest(){
      await this.request({
        url:"http://localhost:3000/merge",
        headers:{
          "content-type":"application/json"
        },
        data:JSON.stringify({
          filename:this.container.file.name,
          fileHash:this.container.hash,
          size:SIZE
        })
      
      })
      this.$message.success("upload success")
      this.status=Status.wait
    },

    //验证文件是否已经被上传
    async verifyUpload(filename,fileHash){
      const {data}=await this.request({
        url:"http://localhost:3000/verify",
        headers:{
          "content-type":"application/json"
        },
        data:JSON.stringify({
          filename,
          fileHash
        })
      })
      return JSON.parse(data)
    },

    //删除
    async handleDelete(){
      const {data}=await this.request({
        url:"http://localhost:3000/delete",
      })
      if(JSON.parse(data).code===200){
        this.$message.success("delete success")
      }
    },


    //进度条
    //xhr.upload.onprogress 每次上传切片都会触发函数更新percentage
    createProgressHandler(item){
      return e=>{
        item.percentage=parseInt(String((e.loaded/e.total)*100))
        // console.log(e);
      }
    }
  }
};
</script>
