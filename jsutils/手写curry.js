// 函数柯里化指的是一种将使用多个参数的一个函数
// 转换成一系列使用一个参数的函数的技术。
function myCurry(fn,...args){
  const len=fn.length
  return function(...params){
    let curArgs=[...args,...params]
    if(curArgs.length>=len){
      return fn.apply(this,curArgs)
    }else{
      return myCurry.bind(this,fn,...curArgs)
    }
  }
}
function curry(fn, ...args) {
  //获取函数需要的参数长度
  const len = fn.length
  return function (...params) {
    //拼接参数
    let curryArgs = [...args, ...params]
    //参数长度够就执行
    //不够就递归返回柯里化的函数，等待参数传入
    if (curryArgs.length >= len) {
      return fn.apply(this, curryArgs)
    } else {
      return curry.call(this, fn, ...curryArgs)
    }
  }
}
// es6 实现
function curryEs6(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curryEs6.bind(null, fn, ...args);
}

function add(a, b, c) {
  return a + b + c;
}

var addCurry = curry(add)
console.log(addCurry(2)(3)(1))



