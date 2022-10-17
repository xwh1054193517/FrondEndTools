const rgb2String = (str) => {
  let res = ''
  if (str.indexOf('#') === 0) {
    res = str
  } else if (str.indexOf('rgb(') === 0) {
    const colors = str.replace(/rgb\(/g, "").replace(/\)/g, "").split(",")
    const r = parseInt(colors[0]).toString(16).length == 1 ? "0" + parseInt(colors[0]).toString(16) : parseInt(colors[0]).toString(16)
    const g = parseInt(colors[1]).toString(16).length == 1 ? "0" + parseInt(colors[1]).toString(16) : parseInt(colors[1]).toString(16)
    const b = parseInt(colors[2]).toString(16).length == 1 ? "0" + parseInt(colors[2]).toString(16) : parseInt(colors[2]).toString(16)
    res = `#${r}${g}${b}`
  }
  return res
}

const string2rgb = (str) => {
  str = str.toLowerCase()
  let res = ''
  if (str.indexOf('rgb(') === 0) {
    res = str
  } else if (str.indexOf('rgba(') === 0) {
    const colors = str.replace(/rgba\(/g, "").replace(/\)/g, "").split(",")
    const r = colors[0]
    const g = colors[1]
    const b = colors[2]
    res = `rgb(${r},${g},${b})`
  } else if (str.indexOf('#') === 0) {
    const colors = str.replace(/\#/g, "")
    let resArr = []
    if (colors.length === 3) {
      colors.replace(/[0-9a-f]/g, str => {
        return str + str
      })
    }
    for (let i = 0; i < colors.length; i += 2) {
      resArr.push(parseInt(colors[i] + colors[i + 1], 16))
    }
    res = `rgb(${resArr.join(',')})`
  }
  return res
}
console.log(rgb2String("rgb(255,253,254)"));
console.log(string2rgb("#fffdfe"));
console.log(string2rgb("rgba(255,253,254,0.3)"));