// Fisher-Yates
function fisherShuffle(arr) {
  var res = []
  while (arr.length > 0) {
    let random = Math.floor(Math.random() * arr.length)
    res.push(arr[random])
    arr.splice(random, 1)
  }
  return res
}

function shuffle1(arr) {
  let res = []
  while (arr.length > 0) {
    let random = Math.floor(Math.random() * arr.length)
    res.push(arr[random])
    arr.splice(random, 1)
  }
  return res
}

// Knuth-Durstenfeld Shuffle
function KnuthDurstenfeldShuffle(arr) {
  var length = arr.length
  var temp, random
  while (0 != length) {
    random = Math.floor(Math.random() * length)
    length--
    temp = arr[length]
    arr[length] = arr[random]
    arr[random] = temp
  }
  return arr
}

function shuffle2(arr) {
  let len = arr.length
  let temp,random

  while(len!=0){
    random=Math.floor(Math.random()*len)
    len--
    temp=arr[len]
    arr[len]=arr[random]
    arr[random]=temp
  }
  return arr
}

let arr=[1,2,3,4,5]
shuffle2(arr)
console.log(arr)