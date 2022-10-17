//深拷贝
//loadsh的cloneDeep
//JSON.parse JSON.stringify 时间将只是字符串的形式。而不是时间对象 RegExp、Error对象，则序列化的结果将只得到空对象 obj里有函数，undefined，则序列化的结果会把函数或 undefined Symbol 丢失；

//深拷贝
// _.cloneDeep()
// const _ = require('lodash');
// const obj3 = {
//   a: 1,
//   b: {
//     f: {
//       g: 1
//     }
//   },
//   c: [1, 2, 3]
// };
// const obj4 = _.cloneDeep(obj3);
// console.log(obj3.b.f === obj4.b.f); // false

//手写深拷贝
const iterations = [
  '[object Object]',
  '[object Array]',
  '[object Map]',
  '[object Set]',
]

function deepClone(source, map = new WeakMap()) {
  // 处理null
  if (source == null) return source;

  //获取对象类型
  const type = Object.prototype.toString.call(source)
  // 处理不可遍历对象
  if (!iterations.includes(type)) {
    // 处理日期
    if (type === '[object Date]') return new Date(source)

    // 处理正则
    if (type === '[object RegExp]') return new RegExp(source)

    // 处理 Symbol
    if (type === '[object Symbol]') return Symbol(source.description)

    // 其他未处理的类型，一般是原始类型或函数，直接返回
    return source
  }

  //创建可遍历对象实例
  let target = new source.constructor()

  // 处理循环引用
  if (map.get(source)) {
    return source // 如果已经处理过，则直接返回，不再遍历
  } else {
    map.set(source, target)
  }
  //处理map和set
  if (type === '[object Map]') {
    source.forEach((val, key) => {
      target.set(key, deepClone(val))
    })
    return target;
  }

  if (type === '[object Set]') {
    source.forEach((val) => {
      target.add(deepClone(val))
    })
    return target
  }

  //处理对象和数组
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = deepClone(source[key])
    }
  }
  return target
}


let a = {
  b: 1,
  c: [1, 2, 3],
  f: function () {
    console.log(123);
  },
  d: new Map([
    ['key1', 'value'],
    ['key2', 'value2']
  ])
}

let b = deepClone(a)
console.log(b.c === a.c);

let copy = Object.assign({}, a)
console.log(copy.c === a.c);

console.log(b);


// 浅拷贝  
// 引用对象的值会一起改变
// 常用object.assign,Array.prototype.slice,Array.prototype.concat
function shallowClone(obj) {
  if (!obj || typeof obj !== 'object') return
  const newObj = new obj.constructor()
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

var obj = {
  age: 18,
  nature: ['smart', 'good'],
  names: {
    name1: 'fx',
    name2: 'xka'
  },
  love: function () {
    console.log('fx is a great girl')
  }
}

// var obj1 = shallowClone(obj)
// console.log(obj1);



