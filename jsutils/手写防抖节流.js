// 防抖
// 简单版本
function debounce(func, wait) {
  let timer = null
  return function () {
    let content = this
    let args = arguments

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fucn.apply(content, args)
    }, wait);
  }
}
//立即执行
function debouce(func, wait, immediate) {
  let timer = null
  return function () {
    let content = this
    let args = arguments

    if (timer) clearTimeout(timer)

    if (immediate) {
      //第一次会直接执行 
      //第二次执行就是false
      let callNow = !timeout
      timer = setTimeout(() => {
        timer = null
      }, wait);
      if (callNow) {
        func.apply(content, args)
      }
    } else {
      timer = setTimeout(() => {
        func.apply(content, args)
      }, wait);
    }
  }
}


// 节流 
//时间戳版
function throttled1(fn, delay = 500) {
  let oldtime = Date.now()
  return function (...args) {
    let newtime = Date.now()
    if (newtime - oldtime >= delay) {
      fn.apply(null, args)
      oldtime = Date.now()
    }
  }
}

// 计时器班
function throttle(fn, delay) {
  let timer = null
  return function (...args) {
    let content = this
    let args=arguments
    if(!timer){
      fn.apply(content,args)
      timer=setTimeout(()=>{
        timer=null
      },delay)
    }
  }
}



//结合写法
function throttled(fn, delay) {
  let timer = null
  let starttime = Date.now()
  return function () {
    let curTime = Date.now()
    //上次执行到现在还剩多少
    let remaining = delay - (curTime - starttime)
    let context = this
    let args = arguments
    clearTimeout(timer)
    //不剩则立刻执行
    if (remaining <= 0) {
      fn.apply(context, args)
      starttime = Date.now()
      // 剩则延时执行
    } else {
      timer = setTimeout(fn, remaining);
    }
  }
}