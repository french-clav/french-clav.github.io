Array.prototype.orderBy = function(selector) {
    return this.sort((a, b) => selector(a) - selector(b));
}