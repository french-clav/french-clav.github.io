import TimestampRange from "../util/timestampRange.js"

export default class Epoch {
    constructor(start, end, name, color) {
        this.range = new TimestampRange(start, end)
        this.name = name
        this.color = color
    }
}