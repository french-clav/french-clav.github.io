export default function classNames(table) {
    return Object.entries(table)
        .filter(([, value]) => value)
        .map(([key, ]) => key)
        .join(" ")
}