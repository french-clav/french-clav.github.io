import { includes } from "lodash"
import Timestamp from "../util/timestamp.js"
import TimestampRange from "../util/timestampRange.js"

export default class HistoricalEpoch {
    constructor(start, end, name, color) {
        this.start = new Timestamp(start)
        this.end = new Timestamp(end)
        this.name = name
        this.color = color
    }

    get range() {
        return new TimestampRange(this.start, this.end)
    }
}