export default class Timestamp {
    constructor(input) {
        if (input instanceof Timestamp) {
            this.date = new Date(input.date);
            this.onlyYear = input.onlyYear;

            return;
        }

        if (input instanceof Date) {
            this.date = input;
            this.onlyYear = false;

            return;
        }

        if (typeof input === 'number' || input instanceof Number) {
            this.date = new Date(input);
            this.onlyYear = false;

            return;
        }

        if (typeof input === 'string' || input instanceof String) {
            this.date = new Date(input);
            this.onlyYear = input.length <= 4;
        }
    }

    static new(input) {
        if (input == null)
            return input;

        if (input == '')
            return null;

        return new Timestamp(input);
    }

    get year() {
        return this.date.getFullYear();
    }

    addYears(years) {
        const date = new Date(this.date);
        date.setFullYear(date.getFullYear() + years);

        return new Timestamp(date);
    }

    toString() {
        return this.onlyYear
            ? this.date.getFullYear().toString()
            : this.date.toLocaleDateString();
    }

    valueOf() {
        return this.date.valueOf();
    }
}