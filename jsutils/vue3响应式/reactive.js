//判断是否为对象，注意null也是对象
const isObject = val => val !== null && typeof val === 'object'
//判断是否存在key
const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)


export function reactive(target) {
  //reactive只适用于对象类型
  if (!isObject(target)) return target

  const handler = {
    // 在 getter 中去递归响应式 惰性
    get(target, key, receiver) {
      console.log(`获取对象的${key}属性`);
      //在这收集依赖 
      track(target, key)
      const result = Reflect.get(target, key, receiver)
      //递归处理
      if (isObject(result)) {
        return reactive(result)
      }
      return result
    },

    set(target, key, value, receiver) {
      console.log(`设置对象的${key}属性`);

      const oldValue = Reflect.get(target, key, receiver)

      let result = true
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
        trigger(target, key)
        //触发更新
      }
      return result
    },
    deleteProperty(target, key) {
      console.log(`删除对象的${key}属性`);

      //判断是否先有key
      const hasKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)

      if (hasKey && result) {
        //更新操作
        trigger(target, key)
      }
      return result
    }
  }

  return new Proxy(target, handler)
}

// activeEffect 表示当前正在走的 effect
let activeEffect = null
export function effect(cb) {
  activeEffect = cb
  cb()
  activeEffect = null
}

// targetMap 表里每个key都是一个普通对象 对应他们的 depsMap
let targetMap = new WeakMap()

export function track(target, key) {
  //如果当前没有effect就不执行追踪
  if (!activeEffect) return
  //获取当前对象的依赖关系图
  let depsMap = targetMap.get(target)
  //不存在就新建
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  //根据key从依赖图获取到effect组合
  let dep = depsMap.get(key)
  //不存在就新建
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  //如果当前 effect不存在 ，才注册到dep里
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
  }
}

//触发更新
export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}

//判断是否为对象 是对象就用reactive代理
const convert = val => (isObject(val) ? reactive(val) : val)

class RefImpl {
  constructor(_rawValue) {
    this._rawValue = _rawValue
    this.__v_isRef = true
    // 判断 _rawValue 是否是一个对象
    // 如果是对象调用reactive使用 proxy来代理
    // 不是返回 _rawValue 本身
    this._value = convert(_rawValue)
  }

  get value() {
    //追踪 value
    track(this, 'value')
    return this._value
  }

  set value(newValue) {
    if (newValue !== this._value) {
      this._rawValue = newValue
      // 设置新值的时候也得使用 convert 处理一下，判断新值是否是对象
      this._value = convert(this._rawValue)
      trigger(this, 'value')
    }
  }
}

export function ref(rawValue) {
  // __v_isRef 用来标识是否是 一个 ref 如果是直接返回，不用再转
  if (isObject(rawValue) && rawValue.__v_isRef) return rawValue
  return new RefImpl(rawValue)
}

