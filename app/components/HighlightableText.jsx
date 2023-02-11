import React from "react"
import "../styles/highlightableText.css"

export default function HighlightableText({ text, searchQuery }) {
    if (searchQuery == null || searchQuery === "") {
        return (
            <span>{text}</span>
        )
    }

    const escapedKey = escapeRegExp(searchQuery)
    const regExp = new RegExp(`(${escapedKey})`, 'gi')
    const textParts = text.split(regExp)
    return (
        <>
            {textParts.map((entry, i) => (
                <span key={i} className={regExp.test(entry) ? "highlighted" : ""}>
                    {entry}
                </span>
            ))}
        </>
    )
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}