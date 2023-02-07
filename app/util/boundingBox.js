import Vector2 from "./vector2.js"

export default class BoundingBox {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    size() {
        return new Vector2(this.width, this.height)
    }

    topLeft() {
        return new Vector2(this.x, this.y)
    }

    topCenter() {
        return new Vector2(this.x + this.width / 2, this.y)
    }

    topRight() {
        return new Vector2(this.x + this.width, this.y)
    }

    bottomRight() {
        return new Vector2(this.x + this.width, this.y + this.height)
    }

    bottomCenter() {
        return new Vector2(this.x + this.width / 2, this.y + this.height)
    }

    encapsulate(vector) {
        const x1 = this.x != null ? Math.min(this.x, vector.x) : vector.x
        const y1 = this.y != null ? Math.min(this.y, vector.y) : vector.y
        const x2 = this.x != null && this.width != null ? Math.max(this.x + this.width, vector.x) : vector.x
        const y2 = this.y != null && this.height != null ? Math.max(this.y + this.height, vector.y) : vector.y

        return new BoundingBox(x1, y1, x2 - x1, y2 - y1)
    }

    union(other) {
        return this
            .encapsulate(other.topLeft())
            .encapsulate(other.bottomRight())
    }

    getLocalPosition(vector) {
        return new Vector2(vector.x - this.x, vector.y - this.y)
    }

    getLocalProportionalPosition(vector) {
        return this.getLocalProportionalSize(this.getLocalPosition(vector))
    }

    getLocalProportionalSize(vector) {
        return new Vector2(vector.x / this.width, vector.y / this.height)
    }
}