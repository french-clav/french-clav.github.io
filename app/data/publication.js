import Timestamp from "../util/timestamp.js"

export default class Publication {
    constructor(id, timestamp, type, typeGenitive, name) {
        this.id = id
        this.timestamp = new Timestamp(timestamp)
        this.type = type
        this.typeGenitive = typeGenitive
        this.name = name
    }
}