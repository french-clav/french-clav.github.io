import Timestamp from "./timestamp.js";

export default class TimestampRange {
    constructor(start, end) {
        this.start = Timestamp.new(start);
        this.end = Timestamp.new(end);
    }

    lerp(t) {
        const delta = this.end - this.start;
        return Timestamp.new(this.start.valueOf() + delta * t);
    }

    inverseLerp(timestamp) {
        return (Timestamp.new(timestamp) - this.start) / (this.end - this.start);
    }

    hasBothEnds() {
        return this.start != null && this.end != null;
    }
}