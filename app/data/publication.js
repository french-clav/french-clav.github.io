import Timestamp from "../util/timestamp.js";

export default class Publication {
    constructor(timestamp) {
        this.timestamp = Timestamp.new(timestamp);
    }
}