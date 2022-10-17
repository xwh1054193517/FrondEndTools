class LRUCache {
  constructor(capacity) {
    this.secretKey = new Map()
    this.capacity = capacity
  }

  get(key) {
    if (this.secretKey.has(key)) {
      let temp = this.secretKey.get(key)
      this.secretKey.delete(key)
      this.secretKey.set(key, temp)
      return temp
    } else {
      return -1
    }
  }

  set(key, value) {
    if (this.secretKey.has(key)) {
      this.secretKey.delete(key)
      this.secretKey.set(key, value)
    } else if (this.secretKey.size < this.capacity) {
      this.secretKey.set(key, value)
    } else {
      this.secretKey.set(key, value)
      this.secretKey.delete(this.secretKey.keys().next().value)
    }
  }
}

 let cache = new LRUCache(2);
cache.set(1, 1);
cache.set(2, 2);
console.log("cache.get(1)", cache.get(1))// 返回  1
cache.set(3, 3);// 该操作会使得密钥 2 作废
console.log("cache.get(2)", cache.get(2))// 返回 -1 (未找到)
cache.set(4, 4);// 该操作会使得密钥 1 作废
console.log("cache.get(1)", cache.get(1))// 返回 -1 (未找到)
console.log("cache.get(3)", cache.get(3))// 返回  3
console.log("cache.get(4)", cache.get(4))// 返回  4




class MyLru{
  constructor(size){
    this.myMap=new Map
    this.size=size
  }

  get(key){
    if(this.myMap.has(key)){
      const val=this.myMap.get(key)
      this.myMap.delete(key)
      this.myMap.set(key,val)
      return val
    }else{
      return -1
    }
  }

  set(key,val){
    if(this.myMap.has(key)){
      this.myMap.delete(key)
      this.myMap.set(key,val)
    }else if(this.myMap.size <this.size){
      this.myMap.set(key,val)
    }else{
      this.myMap.set(key,val)
      this.myMap.delete(this.myMap.keys().next().value)
    }
  }
}