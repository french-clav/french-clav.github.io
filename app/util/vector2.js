export default class Vector2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(other) {
        return new Vector2(this.x + other.x, this.y + other.y)
    }

    addX(deltaX) {
        return new Vector2(this.x + deltaX, this.y)
    }

    addY(deltaY) {
        return new Vector2(this.x, this.y + deltaY)
    }

    subtract(other) {
        return new Vector2(this.x - other.x, this.y - other.y)
    }

    scale(other) {
        if (typeof other === "number") {
            return new Vector2(this.x * other, this.y * other)
        }

        return new Vector2(this.x * other.x, this.y * other.y)
    }

    xy() {
        return this.toObject("x", "y")
    }

    widthHeight() {
        return this.toObject("width", "height")
    }

    toObject(xPropertyName, yPropertyName) {
        return {
            [xPropertyName]: this.x,
            [yPropertyName]: this.y
        }
    }
}