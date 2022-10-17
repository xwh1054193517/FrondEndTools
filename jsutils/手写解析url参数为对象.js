function parseParam(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]
  const paramsArr = paramsStr.split('&')
  let paramObj = {}
  paramsArr.forEach(param => {
    console.log(param);
    if (/=/.test(param)) {
      let [key, val] = param.split('=')
      val = decodeURIComponent(val)
      val=/^\d+$/.test(val)?parseFloat(val):val
      if(paramObj.hasOwnProperty(key)){
        paramObj[key]=[].concat(paramObj[key],val)
      }else{
        paramObj[key]=val
      }
    }else{
      paramObj[param]=true
    }
  })
  return paramObj
}

let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
console.log(parseParam(url))