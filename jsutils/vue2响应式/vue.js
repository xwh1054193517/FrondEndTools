class Vue {
  constructor(obj_instance) {
    this.$data = obj_instance.data
    Observer(this.$data)
    Compile(obj_instance.el, this)
  }
}

//数据劫持
function Observer(data_instance) {
  if (!data_instance || typeof data_instance !== 'object') return
  const dependency = new Dep()
  Object.keys(data_instance).forEach(key => {
    let value = data_instance[key]
    Observer(value)
    Object.defineProperty(data_instance, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log(`访问了属性:${key}->值:${value}`);
        Dep.temp && dependency.addSub(Dep.temp)
        if (Dep.temp) {
          console.log(dependency);
        }
        return value
      },
      set(newValue) {
        console.log(`属性:${key}的值:${value}修改为->${newValue}`);
        value = newValue
        Observer(value)
        dependency.notify()
      }
    })
  })
}

function Compile(element, vm) {
  vm.$el = document.querySelector(element)
  const fragment = document.createDocumentFragment()
  let child
  while (child = vm.$el.firstChild) {
    fragment.append(child)
  }
  // console.log(fragment)
  // console.log(fragment.childNodes);;

  fragment_compile(fragment)

  function fragment_compile(node) {
    const pattern = /\{\{\s*(\S+)\s*\}\}/
    if (node.nodeType === 3) {
      let nodeVal = node.nodeValue
      const res_Regex = pattern.exec(node.nodeValue)
      if (res_Regex) {
        const arr = res_Regex[1].split(".")
        const value = arr.reduce((total, current) => total[current], vm.$data)
        node.nodeValue = nodeVal.replace(pattern, value)

        //创建订阅者
        new Watcher(vm, res_Regex[1], newValue => {
          node.nodeValue = nodeVal.replace(pattern, newValue)
        })
        return
      }
    }
    if (node.nodeType === 1 && node.nodeName === 'INPUT') {
      const attr = Array.from(node.attributes)
      attr.forEach(i => {
        if (i.nodeName === 'v-model') {
          const value = i.nodeValue.split('.').reduce((total, current) => total[current], vm.$data)
          node.value = value
          new Watcher(vm, i.nodeValue, newValue => {
            node.value = newValue
          })
          node.addEventListener('input',e=>{
            const arr1=i.nodeValue.split('.')
            const arr2=arr1.slice(0,arr1.length-1)
            const final=arr2.reduce((total,current)=>total[current],vm.$data)
            final[arr1[arr1.length-1]]=e.target.value

          })
        }
      })
    }
    node.childNodes.forEach(child => fragment_compile(child))
  }
  vm.$el.appendChild(fragment)
}


// 依赖
class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

// 订阅者
class Watcher {
  constructor(vm, key, callback) {
    this.vm = vm;
    this.key = key;
    this.callback = callback
    //临时属性 触发getter
    Dep.temp = this;
    console.log(`用属性${key}创建watcher`);
    key.split('.').reduce((total, current) => total[current], vm.$data)
    Dep.temp = null
  }
  update() {
    const value = this.key.split('.').reduce((total, current) => total[current], this.vm.$data)
    this.callback(value)
  }
}