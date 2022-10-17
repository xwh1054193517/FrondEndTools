function myInstance(L, R) {
  if (typeof L !== 'object' || L === null) {
    return false
  }
  let left = Object.getPrototypeOf(L)
  let right = R.prototype
  while (true) {
    if (!left) return false
    if (left === right) return true
    left = Object.getPrototypeOf(left)
  }
}

console.log(myInstance({}, Object))

console.log(null === null, undefined === undefined, null == undefined)

console.log(1 + null, 1 + undefined);


function myinstanceof(left, right) {
  if (typeof left !== 'object' || left === null) return false
  let leftP=Object.getPrototypeOf(left)
  let rightP=right.prototype
  while(true){
    if(!leftP)return false
    if(leftP===rightP)return true
    leftP=Object.getPrototypeOf(leftP)
  }
}

console.log(myinstanceof({}, Object))