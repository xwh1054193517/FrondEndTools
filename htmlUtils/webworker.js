console.log("进入了worker")
addEventListener("message", function (evt) {
    // evt.data
    console.log("worker接受了数据:",evt.data);
});
postMessage("worker发送回去：子组件的数据");