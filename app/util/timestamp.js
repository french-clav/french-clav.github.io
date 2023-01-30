export default class Timestamp {
    constructor(input) {
        if (input instanceof Timestamp) {
            this.date = new Date(input.date)
            this.onlyYear = input.onlyYear
            this.approximate = input.approximate

            return
        }

        if (input instanceof Date) {
            this.date = input
            this.onlyYear = false
            this.approximate = false

            return
        }

        if (typeof input === 'number' || input instanceof Number) {
            this.date = new Date(input)
            this.onlyYear = false
            this.approximate = false

            return
        }

        if (typeof input === 'string' || input instanceof String) {
            const match = input.match(/^(?<approximate>~)?(?<date>\d{1,4}(?<ext>-\d{2}-\d{2})?)$/)
            this.date = new Date(match.groups.date)
            this.onlyYear = !match.groups.ext
            this.approximate = !!match.groups.approximate
        }
    }

    get year() {
        return this.date.getFullYear()
    }

    addYears(years) {
        const date = new Date(this.date)
        date.setFullYear(date.getFullYear() + years)

        return new Timestamp(date)
    }

    addDays(days) {
        const date = new Date(this.date)
        date.setDate(date.getDate() + days)

        return new Timestamp(date)
    }

    startOfYear() {
        return new Timestamp(this.year.toString())
    }

    toYearString() {
        return `${this.#getApproximatePrefix()}${this.date.getFullYear()}`
    }

    toString() {
        const datePart = this.onlyYear
            ? this.date.getFullYear().toString()
            : this.date.toLocaleDateString()

        return `${this.#getApproximatePrefix()}${datePart}`
    }

    valueOf() {
        return this.date.valueOf()
    }

    #getApproximatePrefix() {
        return this.approximate ? "ок. " : ""
    }
}