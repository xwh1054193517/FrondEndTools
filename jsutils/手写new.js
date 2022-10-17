function mynew(fn, ...args) {
  if (typeof fn !== 'function') {
    throw new Error('not a function')
  }
  //创建一个空对象
  let obj = {}
  // 使得新对象的隐式原型指向原构造函数的显示原型
  Object.setPrototypeOf(obj, fn.prototype)
  // obj.__proto__ = fn.prototype
  //this指向Obj
  let result = fn.apply(obj, args)
  console.log('result是', result);
  console.log('obj是', obj);
  // 根据返回值判断
  return result instanceof Object ? result : obj
}


function Person(name, age) {
  this.name = name;
  this.age = age;
  return {
    a: 1
  }
}

const person1 = mynew(Person, 'abc', 18)
console.log(person1);

function myNew(fn, ...args) {
  if (typeof fn !== 'function') {
    throw new Error('gg')
  }
  //创建一个空对象
  let obj = {}
  //把obj的原型设置为fn的原型
  Object.setPrototypeOf(obj, fn.prototype)
  //把fn 的this绑定到Obj上并执行
  let res = fn.apply(obj, args)
  return res instanceof Object ? res : obj
}