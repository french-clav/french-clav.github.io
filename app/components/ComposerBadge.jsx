import React from "react"
import ComposerYears from "./ComposerYears.jsx"
import "../extensions/numberExtensions.js"
import "../styles/composerBadge.css"

export default function ComposerBadge({
    composer,
    className,
    showLifetime,
    onClick
}) {
    return (
        <div className={`composer-badge ${className}`} onClick={onClick}>
            <p className="composer-name">{composer.name}</p>
            <ComposerYears composer={composer} show={showLifetime} />
        </div>
    )
}