import "../extensions/arrayExtensions.js"

export default class Generation {
    constructor(composers, name, color, isWeak) {
        this.composers = composers.orderBy(c => c.birth)
        this.first = composers[0]
        this.last = composers[composers.length - 1]

        this.name = name
        this.color = color
        this.isWeak = isWeak
    }
}