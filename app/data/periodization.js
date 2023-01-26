import Timestamp from "../util/timestamp.js"

export default class Periodization {
    constructor(name, epochs, active) {
        this.name = name
        this.epochs = epochs
        this.active = active
    }

    getEpoch(timestamp) {
        timestamp = new Timestamp(timestamp)
        return this.epochs.find(e => e.range.includes(timestamp))
    }
}