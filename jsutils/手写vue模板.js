function render(template, data) {
  const reg = /\{\{(\w+)\}\}/
  if (reg.test(template)) {
    // console.log(reg.exec(template));
    const val = reg.exec(template)[1]
    template = template.replace(reg, data[val])
    return render(template, data)
  }
  return template
}

let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let person = {
  name: '布兰',
  age: 12
}
console.log(render(template, person)); // 我是布兰，年龄12，性别undefined

function myRender(template,data){
  const reg=/\{\{(w+)\}\}/
  if(reg.test(template)){
    const val=reg.exec(template)[1]
    template=template.replace(reg,data[val])
    return render(template,data)
  }
  return template
}