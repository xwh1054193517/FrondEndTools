function flatten(arr) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]))
    } else {
      res.push(arr[i])
    }
  }
  return res
}

// 拓展运算符 
function flat(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}


//reduce方法实现
function reduceFlat(arr) {
  return arr.reduce((res, item) => {
    return res.concat(Array.isArray(item) ? reduceFlat(item) : item);
  }, [])
}

let arr = [1, 2, [3, [4, 5], 6], 7]
console.log(reduceFlat(arr));

function flat1(arr){
  let res=[]
  for(let i=0;i<arr.length;i++){
    if(Array.isArray(arr[i])){
      res=res.concat(flat1(arr[i]))
    }else{
      res.push(arr[i])
    }
  }
  return res
}

function flat2(arr){
  return arr.reduce((res,item)=>{
    return res.concat(Array.isArray(item)?flat2(item):item)
  },[])
}

let arr1=[1,[3,[2,5],6],7]
console.log(flat1(arr1))
console.log(flat2(arr1))

