Array.prototype.orderBy = function (selector) {
    return this.sort((a, b) => selector(a) - selector(b))
}

Array.prototype.minBy = function (selector) {
    return this.orderBy(selector)[0] ?? null
}

Array.prototype.min = function (selector) {
    const element = this.minBy(selector)
    return element != null
        ? selector(element)
        : null
}

Array.prototype.maxBy = function (selector) {
    return this.orderBy(selector)[this.length - 1] ?? null
}

Array.prototype.max = function (selector) {
    const element = this.maxBy(selector)
    return element != null
        ? selector(element)
        : null
}

Array.prototype.add = function (item) {
    this.push(item)
    return item
}

Array.prototype.except = function (item) {
    return this.filter(e => e != item)
}