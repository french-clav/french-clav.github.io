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