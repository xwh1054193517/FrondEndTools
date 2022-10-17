// 创建对象
const xhr = new XMLHttpRequest()

//建立连接
xhr.open()
// method, url, [async][, user][, password]
// method：表示当前的请求方式，常见的有GET、POST
// url：服务端地址
// async：布尔值，表示是否异步执行操作，默认为true
// user: 可选的用户名用于认证用途；默认为`null
// password: 可选的密码用于认证用途，默认为`null
xhr.send()
// body: 在 XHR 请求中要发送的数据体，如果不传递数据则为 null

// 如果使用GET请求发送数据的时候，需要注意如下：
// 将请求数据添加到open()方法中的url地址中
// 发送请求数据中的send()方法中参数设置为null

request.onreadystatechange = function (e) {
  if (request.readyState === 4) { // 整个请求过程完毕
    if (request.status >= 200 && request.status <= 300) {
      console.log(request.responseText) // 服务端返回的结果
    } else if (request.status >= 400) {
      console.log("错误信息：" + request.status)
    }
  }
}

//0:open方法未调用  1：send方法未调用，2:send方法已调用，响应头和响应状态已经返回 3：响应体下载中，responseText已经获得部分数据 4：整个过程已经完成

// 封装ajax

function ajax(options) {
  const xhr = new XMLHttpRequest()

  options = options || {}
  options.type = (options.type || 'GET').toUpperCase()
  optins.dataType = options.dataType || 'json'
  const params = options.data

  if (options.type === 'GET') {
    xhr.open('GET', options.url + '?' + params, true)
    xhr.send(null)
  } else if (options.type === 'POST') {
    xhr.open('POST', options.url, true)
    xhr.send(params)
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      let status = xhr.status
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML)
      } else {
        options.fail && options.fail(status)
      }
    }
  }
}

function myAjax(options) {
  const xhr = XMLHttpRequest()

  options = options || {}
  options.type = (options.type || 'GET').toUpperCase()
  options.dataType = options.dataType || 'json'

  const params = options.data

  if (options.type === 'GET') {
    xhr.open('GET', options.url + '?' + params, true)
    xhr.send(null)
  } else if (options.type === 'POST') {
    xhr.open('POST', options.url, true)
    xhr.send(params)
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      let status = xhr.status
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML)
      } else {
        options.fail && options.fail(status)
      }
    }
  }
}


// Promise封装
function myPromiseAjax(url){
  let promise=new Promise((resolve,reject)=>{
    let xhr=new XMLHttpRequest()
    xhr.open('GET',url,true)
    xhr.onreadystatechange=function(){
      if(xhr.readyState!==4)return;
      if(xhr.status===200){
        resolve(xhr.response)
      }else{
        reject(new Error(xhr.status))
      }
    }

    xhr.onerror=function(){
      reject(new Error(xhr.statusText))
    }
    xhr.responseType='json'
    xhr.getResponseHeader("Accept","application/json")
    xhr.send(null)
  })
  return promise
}