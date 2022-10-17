Function.prototype.myCall = function (context) {
  //先判断调用的是不是一个函数
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }
  // 不传参默认为window
  context = context || window
  //this为调用mycall的函数 把他设置为绑定对象上的一个方法
  context.fn = this
  // 获得参数
  let args = Array.from(arguments).slice(1)
  let res = context.fn(...args)
  delete context.fn
  return res
}

function mycall(context) {
  if (typeof this !== 'function') throw new Error('123')
  context = context || window
  context.fn = this
  let args = Array.from(arguments)
  let res = context.fn(...args)
  delete context.fn
  return res
}

function myapply(context) {
  if (typeof this !== 'function') throw new Error('123')
  context = context || window
  context.fn = this
  let res
  if (arguments[1]) {
    res = context.fn(...args)
  } else {
    res = context.fn()
  }
  delete context.fn
  return res
}
Function.prototype.myApply = function (context) {
  //先判断调用的是不是一个函数
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }

  //不传参默认为window
  context = context || window

  //this为调用myCall的函数 把它设为要指定对象的一个方法
  context.fn = this
  let result = null
  // console.log(arguments)
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

Function.prototype.myBind = function (context) {
  //先判断调用的是不是一个函数
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }
  //this指向调用bind的函数
  var fn = this;
  // 获取bind2函数从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1)
  //当绑定函数用New构造时，this会失效 但参数保存
  return function F() {
    var bindArgs = Array.prototype.slice.call(arguments);
    // 当作为构造函数时，this 指向实例，此时结果为 true，
    // 将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值

    // 当作为普通函数时，this 指向 window，
    // 此时结果为 false，将绑定函数的 this 指向 context
    return fn.apply(this instanceof F ? this : context, args.concat(bindArgs))
  }
}

function myBind(context) {
  if (typeof this !== 'function') throw new Error('123')
  context = context || window
  var fn = this
  var args = Array.prototype.slice.call(arguments)
  return function F() {
    var bindargs = Array.prototype.slice.call(arguments)
    return fn.apply(this instanceof F ? this : context, args.concat(bindargs))
  }
}

var obj = {
  value: 1
}

function f(a, b) {
  console.log(a + b + this.value)
}

var name = 'Jack';

function person(age, job, gender) {
  console.log(this.name, age, job, gender);
}
var Yve = {
  name: 'Yvette'
};
// let resCall=f.myCall(obj,1,2)
// let resApply=f.myApply(obj,[2,3])
let result = person.myBind(Yve, 22, 'enginner');
// result('female')

let objbind = new result('female')
result('male')