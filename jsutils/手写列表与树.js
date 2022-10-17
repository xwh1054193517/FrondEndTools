let list = [{
    id: 1,
    text: '节点1',
    parentId: 0 //这里用0表示为顶级节点
  },
  {
    id: 2,
    text: '节点1_1',
    parentId: 1 //通过这个字段来确定子父级
  }, {
    id: 3,
    text: '节点1_2',
    parentId: 1 //通过这个字段来确定子父级
  }
]

function list2Tree(data) {
  let temp = {}
  let tree = []
  //先把每个节点id映射到temp
  for (let i = 0; i < data.length; i++) {
    temp[data[i].id] = data[i]
  }
  for (let i in temp) {
    //如果不是根节点
    if (temp[i].parentId != 0) {
      if (!temp[temp[i].parentId].children) {
        temp[temp[i].parentId].children = []
      }
      temp[temp[i].parentId].children.push(temp[i]);
    } else {
      tree.push(temp[i])
    }
  }
  return tree
}


// console.log(list2Tree(list));
function listToTree(data) {
  let temp = {}
  let tree = []
  for (let i = 0; i < data.length; i++) {
    temp[data[i].id] = data[i]
  }
  for (let id in temp) {
    if (temp[id].parentId != 0) {
      if (!temp[temp[id].parentId].children) {
        temp[temp[id].parentId].children = []
      }
      temp[temp[id].parentId].children.push(temp[id])
    } else {
      tree.push(temp[id])
    }
  }
  return tree
}
// console.log(listToTree(list));

function tree2List(data) {
  let res = []
  const dfs = (tree) => {
    tree.forEach((item) => {
      if (item.children) {
        dfs(item.children)
        delete item.children
      }
      res.push(item)

    })
  }
  dfs(tree)
  return res
}

function treeToList(data) {
  let res = []
  const dfs = (tree) => {
    tree.forEach(item => {
      if (item.children) {
        dfs(item.children)
        delete item.children
      }
      res.push(item)
    })
  }
  dfs(data)
  return res
}
let tree = [{
  id: 1,
  text: '节点1',
  parentId: 0,
  children: [{
    id: 2,
    text: '节点1_1',
    parentId: 1
  }, {
    id: 3,
    text: '节点1_2',
    parentId: 1
  }]
}, {
  id: 4,
  text: '节点1',
  parentId: 0,
  children: [{
    id: 5,
    text: '节点2_1',
    parentId: 4
  }, {
    id: 6,
    text: '节点2_2',
    parentId: 4
  }]

}]

// console.log(tree2List(tree));
console.log(treeToList(tree));