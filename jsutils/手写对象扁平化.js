function flat(obj) {
  var newObj = {}
  function format(o, pre) {
    for (let key in o) {
      if (typeof o[key] === 'object') {
        if (!pre) {
          format(o[key], key)
        } else {
          if (Array.isArray(o)) {
            format(o[key], pre + '[' + key + ']')
          } else {
            format(o[key], pre + '.' + key)
          }
        }

      } else {
        if (!pre) {
          newObj[key] = o[key]
        } else {
          if (Array.isArray(o)) {
            newObj[pre + '[' + key + ']'] = o[key]
          } else {
            newObj[pre + '.' + key] = o[key]
          }
        }

      }
    }
  }
  format(obj, null)
  return newObj
}

function ObjFlat(obj) {
  var newObject = {}

  function helper(obj, prefix) {
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        if (!prefix) {
          helper(obj[key], key)
        } else {
          if (Array.isArray(obj)) {
            helper(obj[key], prefix + '[' + key + ']')
          } else {
            helper(obj[key], prefix + '.' + key)
          }
        }
      } else {
        if (!prefix) {
          newObject[key] = obj[key]
        } else {
          if (Array.isArray(obj)) {
            newObject[prefix + '[' + key + ']'] = obj[key]
          } else {
            newObject[prefix + '.' + key] = obj[key]
          }
        }
      }
    }
  }
  helper(obj, null)
  return newObject
}




function isObject(val) {
  return typeof val === "object" && val !== null;
}

function flatten(obj) {
  if (!isObject(obj)) {
    return;
  }
  let res = {};
  const dfs = (cur, prefix) => {
    if (isObject(cur)) {
      if (Array.isArray(cur)) {
        cur.forEach((item, index) => {
          dfs(item, `${prefix}[${index}]`);
        });
      } else {
        for (let k in cur) {
          dfs(cur[k], `${prefix}${prefix ? "." : ""}${k}`);
        }
      }
    } else {
      res[prefix] = cur;
    }
  };
  dfs(obj, "");

  return res;
}

const obj = {
  a: {
    b: 1,
    c: 2,
    d: {
      e: 5
    }
  },
  b: [1, 3, {
    a: 2,
    b: 3
  }],
  c: 3
}
// console.log(flat(obj))
// console.log(flatten(obj))
console.log(ObjFlat(obj));