function unique(arr) {
  let res = arr.filter(function (item, index, item) {
    return arr.indexOf(item) === index
  })
  return res
}

const unique1 = (arr) => {
  return Array.from(new Set(arr))
}

function unique2(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) { //第一个等同于第二个，splice方法删除第二个 
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr
}