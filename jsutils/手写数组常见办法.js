// push接收任意数量参数，并添加到数组末尾，返回数组最新长度
let colors = []
let count = colors.push("red", "green")
console.log(count)

//unshift在数组开头添加任意多个值，返回新数组长度

let colors1 = new Array(); // 创建一个数组
let count1 = colors1.unshift("red", "green"); // 从数组开头推入两项
console.log(count1); // 2

// splice 传入3个参数，开始位置、要删除的元素数量，插入的元素，返回空数组
let a = ['red', 'green', 'blue']
let remove = a.splice(1, 0, "yellow", "orange")
console.log(a)
console.log(remove)

//concat首先会创建一个当前数组的副本，然后把它的参数添加到副本末尾，最后返回这个新构建的数组，不影响原数组
let arr = ["red", "green", "blue"];
let arr2 = arr.concat('yellow', ["black", "brown"])
console.log(arr);
console.log(arr2);

// pop用于删除数组最后一项，同时减少Length值，返回 被删除的
let s = ["red", "green"]
let item = s.pop()
console.log(item);

//shift用于删除数组的第一项，同时减少Length值，返回 被删除的
let item2 = s.shift()
console.log(item2);

// splice传入两个元素，开始位置，删除元素的数量,返回包含删除元素的数组
let b = ["red", "green", "blue"];
let removed2 = colors.splice(0, 2);
console.log(removed2);

// slice(开始位置，结束位置-不包含)用来创建一个包含原有数组中一个或多个元素的新数组，不影响原数组
let colorsa = ["red", "green", "blue", "yellow", "purple"];
let colors2 = colorsa.slice(1);
let colors3 = colorsa.slice(1, 4);
console.log(colorsa) // red,green,blue,yellow,purple
console.log(colors2); // green,blue,yellow,purple
console.log(colors3); // green,blue,yellow

// indexof返回 要查找的元素在数组中的位置，没找到返回-1
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
console.log(numbers.indexOf(4)) // 3

// includes返回要查找的元素在数组中的位置,true和false
console.log(numbers.includes(4))

// find返回第一个匹配的元素 当前元素，下表，当前数组
const people = [{
        name: "Matt",
        age: 27
    },
    {
        name: "Nicholas",
        age: 29
    }
];
people.find((element, index, array) => element.age < 28) // // {name: "Matt", age: 27}


// reverse反转数组
let values = [1, 2, 3, 4, 5];
values.reverse();

// sort接受一个比较函数，判断哪个值在前面
// 升序
var arrs = [3, 2, 3, 34, 12, 23, 234, 84, 9];
arrs.sort(function(a, b) {
    return a - b;
});
// 结果：2,3,3,9,12,23,34,84,234

// 降序
var arrs = [3, 2, 3, 34, 12, 23, 234, 84, 9];
arrs.sort(function(a, b) {
    return b - a;
});
// 结果：234,84,34,23,12,9,3,3,2

var arrs = [3, 2, 3, 34, 12, 23, 234, 84, 9];
arrs.sort()
console.log(arrs)
    // 默认排序顺序是根据字符串Unicode码点。


//join
let c = ["red", "green", "blue"];
console.log(c.join(','));


// 迭代
// some对数组每一项都运行传入的测试函数，如果至少有一个元素返回true则返回true
let numbers1 = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let someResult = numbers1.some((item, index, array) => item > 2);
console.log(someResult) // true

// every()
// 对数组每一项都运行传入的测试函数，如果所有元素都返回 true ，则这个方法返回 true
let numbers2 = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let everyResult = numbers2.every((item, index, array) => item > 2);
console.log(everyResult) // false

// forEach()
// 对数组每一项都运行传入的函数，没有返回值 常用于改变数值或者插入数据库
let numbers3 = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers3.forEach((item, index, array) => {
    // 执行某些操作
});

// filter()
// 对数组每一项都运行传入的函数，函数返回 true 的项会组成数组之后返回
let numbers4 = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let filterResult = numbers4.filter((item, index, array) => item > 2);
console.log(filterResult); // 3,4,5,4,3

// map()
// 对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组
let numbers5 = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let mapResult = numbers5.map((item, index, array) => item * 2);
console.log(mapResult) // 2,4,6,8,10,8,6,4,2


// 手写Map
Array.prototype.myMap=function(fn,context){
  let arr=this,ans=[]
  for(let i=0;i<arr.length;i++){
    ans.push(fn.call(context,arr[i],i,arr))
  }
  return ans
}

// 手写filter
Array.prototype.myFilter=function(fn,context){
  let arr=this,ans=[]
  for(let i=0;i<arr.length;i++){
    let res=fn.call(context,arr[i],i,arr)
    res&&ans.push(arr[i])
  }
  return ans
}


// 手写reduce
Array.prototype.myReduce=function(fn,initValue){
  let acc=initValue||this[0]
  let startIdx=initValue?0:1
  for(let i=startIdx;i<this.length;i++){
    acc=fn(acc,this[i],i,this)
  }
  return acc
}

//手写push
Array.prototype.mypush=function(){
  for(let i=0;i<arguments.length;i++){
    this[this.length]=arguments
  }
  return this.length
}