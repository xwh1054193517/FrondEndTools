function numFormat(num) {
  //分割小数点
  num = num.toString().split(".")
  let arr = num[0].split("").reverse()
  let res = []
  for (let i = 0, len = arr.length; i < len; i++) {
    if (i % 3 === 0 && i !== 0) {
      res.push(",")
    }
    res.push(arr[i])
  }
  res.reverse()
  if (num[1]) {
    res = res.join("").concat("." + num[1])
  } else {
    res = res.join("")
  }
  return res
}

function thousand(num) {
  num = num.toString().split(".")
  let numArr = num[0].split("").reverse()
  let res = []
  for (let i = 0; i < numArr.length; i++) {
    if (i % 3 === 0 && i != 0) {
      res.push(",")
    }
    res.push(numArr[i])
  }
  res.reverse()
  if (num[1]) {
    res = res.join("").concat("." + num[1])
  } else {
    res = res.join("")
  }
  return res
}

var a = 1234567894532;
var b = 673439.4542;
console.log(thousand(a)); // "1,234,567,894,532"
console.log(thousand(b)); // "673,439.4542"