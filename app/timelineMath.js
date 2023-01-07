export default class TimelineMath {
    static calcOffset(date, minDate, maxDate) {
        if (!(date instanceof Date)) { // date is year
            date = new Date(date, 0, 1);
        }

        if (!(minDate instanceof Date)) {
            minDate = new Date(minDate, 0, 1);
        }

        if (!(maxDate instanceof Date)) {
            maxDate = new Date(maxDate, 11, 13);
        }

        return (date - minDate) / (maxDate - minDate);
    }
}