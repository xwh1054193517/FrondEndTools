function timeFormat(seconds){
  let ss=parseInt(seconds)
  let min=0
  let hour=0
  if(ss>60){
    min=parseInt(ss/60)
    ss=parseInt(ss%60)
  }
  if(min>60){
    hour=parseInt(min/60)
    min=parseInt(min%60)
  }
  let res=('00'+parseInt(ss)).slice(-2)
  if(min>0){
    res=('00'+parseInt(min)).slice(-2)+':'+res
  }
  if(hour>0){
    res=('00'+parseInt(hour)).slice(-2)+':'+res
  }
  return res
}

console.log(timeFormat(9990));