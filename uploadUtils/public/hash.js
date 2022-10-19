// 导入脚本
// import script for encrypted computing
self.importScripts("/spark-md5.min.js");

// 生成文件 hash
// create file hash
self.onmessage = e => {
  const { fileChunkList } = e.data;
  const spark = new self.SparkMD5.ArrayBuffer();
  let percentage = 0;
  let count = 0;
  const loadNext = index => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileChunkList[index].file);
    reader.onload = e => {
      count++;
      spark.append(e.target.result);
      // 在 worker 线程中，接受文件切片 fileChunkList，
      // 利用 fileReader 读取每个切片的 ArrayBuffer 并不断传入 spark-md5 中，每计算完一个切片通过 postMessage 向主线程发送一个进度事件，
      // 全部完成后将最终的 hash 发送给主线程


      if (count === fileChunkList.length) {
        self.postMessage({
          percentage: 100,
          hash: spark.end()
        });
        self.close();
      } else {
        percentage += 100 / fileChunkList.length;
        self.postMessage({
          percentage
        });
        loadNext(count);
      }
    };
  };
  loadNext(0);
};
