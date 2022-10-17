var fn = (function () {
  var arr = [1, 1, 2]
  return function (n) {
    var res = arr[n]
    if (res) {
      return res
    } else {
      arr[n] = fn(n - 1) + fn(n - 2)
      return arr[n]
    }
  }
})()


var fn=(function fibonaqi(){
  var arr=[1,1,2]
  return function(n){
    var res=arr[n]
    if(res){
      return res
    }else{
      arr[n]=fn(n-1)+fn(n-2)
      return arr[n]
    }
  }
})()
