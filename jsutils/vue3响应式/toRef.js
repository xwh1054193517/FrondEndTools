class ObjectRefImpl {
  constructor(proxy, _key) {
    this._proxy = proxy
    this._key = _key
    this.__v_isRef = true
  }

  get value() {
    // 这里不用收集依赖
    // this._proxy 就是响应式对象，
    // 当访问[this._key]时，
    // this._proxy里面会去自动收集依赖
    return this._proxy[this._key]
  }

  set value(newValue) {
    this._proxy[this._key] = newValue
  }
}

export function toRef(proxy, key) {
  return new ObjectRefImpl(proxy, key)
}


// ref是对原始数据的拷贝，
// 当修改ref数据时，模板中的视图会发生改变，
// 但是原始数据并不会改变。 
// toRef是对原始数据的引用，
// 修改toRef数据时，原始数据也会发生改变，
// 但是视图并不会更新。

export function toRefs(proxy) {
  const ret = proxy instanceof Array ? new Array(proxy.length) : {}

  for(const key in proxy){
    ret[key]=toRef(proxy,key)
  }
  return ret
}