// 用settimeout模仿setInterval
function mySetInterval(fn, t) {
  let timer = null

  function interval() {
    fn()
    timer = setTimeout(interval, t)
  }
  interval()
  return {
    cancel: () => {
      clearTimeout(timer)
    }
  }
}

//反过来
function mySetTimeout(fn, time) {
  const timer = setInterval(() => {
    clearInterval(timer)
    fn()
  }, time);
}

function mySettimeOut(fn, timeout) {
  const timer = setInterval(() => {
    fn()
    clearInterval(timer)
  }, timeout);
}

function mySetinterval(fn, t) {
  let timer = null

  function interval() {
    fn()
    timer = setTimeout(() => {
      interval()
    }, t)
  }
  interval()
  return {
    cancel:()=>{
      clearTimeout(timer)
    }
  }

}