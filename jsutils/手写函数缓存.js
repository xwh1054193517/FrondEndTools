const memoize = function(func, content) {
    let cache = Object.create(null)
    content = content || this
    return (...key) => {
        // 有的话直接返回缓存，没有的话执行函数
        if (!cache[key]) {
            cache[key] = func.apply(content, key)
        }
        return cache[key]
    }
}