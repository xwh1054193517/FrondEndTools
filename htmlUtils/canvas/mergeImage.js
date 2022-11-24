class Draw{
  images={}
  cvs
  ctx
  //渲染图片
  renderList
  //比例
  bl=2
  constructor(option){
    this.cvs=option.el;
    this.bl=option.bl;
    this.ctx=cvs.getContext("2d")
    this.cvs.width=this.cvs.width*this.bl
    this.cvs.height = this.cvs.height * this.bl
    this.renderList = option.renderList
    this.draw()
  }
  async draw(){
    const{ctx,renderList}=this
    const urls=renderList.filter(v=>v.type==='image').map(v=>v.src)
    // console.log(urls);
    await this.loadImgs(urls)
    console.log(this.images);
    renderList.forEach(item=>{
      item.align&&(ctx.textAlign=item.align)
      if(item.type==='image'){
        ctx.beginPath()
        ctx.save()
        //裁剪
        if (item.clipCircle) {
          ctx.lineWidth = item.clipLineWidth
          ctx.strokeStyle = item.clipStrokeStyle
          ctx.arc((item.x+item.width/2)*this.bl, (item.y+item.width/2)*this.bl, item.width/2*this.bl, 0, Math.PI * 2)
          ctx.stroke()
          ctx.clip()
      }
        ctx.drawImage(this.images[item.src],item.x*this.bl,item.y*this.bl,item.width*this.bl,item.height*this.bl)
        ctx.restore()
      }else if(item.type==='text'){
        ctx.fillStyle=item.fillStyle
        ctx.font=`${item.fontSize*this.bl}`
        ctx.fillText(item.text,item.x*this.bl,item.y*this.bl)
      }
    })
  }

  async loadImgs(urls){
    for(let i=0;i<urls.length;i++){
      await this.loadImg(urls[i])
    }
  }

  async loadImg(url){
    return new Promise((res,rej)=>{
      const img=new Image()
      img.src=url;
      img.onload=()=>{
        this.images[url]=img
        res()
      }
    })
  }
}