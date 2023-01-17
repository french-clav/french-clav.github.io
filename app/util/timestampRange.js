import Timestamp from "./timestamp.js"

export default class TimestampRange {
    constructor(start, end) {
        this.start = new Timestamp(start)
        this.end = new Timestamp(end)
    }

    lerp(t) {
        const delta = this.end - this.start
        return new Timestamp(this.start.valueOf() + delta * t)
    }

    inverseLerp(timestamp) {
        return (new Timestamp(timestamp) - this.start) / (this.end - this.start)
    }
}