import Timestamp from "../util/timestamp.js";

export default class Publication {
    constructor(timestamp) {
        this.timestamp = new Timestamp(timestamp);
    }

    get minTimestamp() {
        return this.timestamp;
    }

    get maxTimestamp() {
        return this.timestamp;
    }
}