import React from "react"
import ComposerYears from "./ComposerYears.jsx"
import "../extensions/numberExtensions.js"
import "../styles/composerBadge.css"
import HighlightableText from "./HighlightableText.jsx"

export default function ComposerBadge({
    composer,
    className,
    showLifetime,
    onClick,
    searchQuery
}) {
    return (
        <>
            <div className={`composer-badge ${className}`} onClick={onClick}>
                <p className="composer-name">
                    <HighlightableText text={composer.name} searchQuery={searchQuery} />
                </p>
                <ComposerYears composer={composer} searchQuery={searchQuery} show={showLifetime} />
            </div>
            {composer.tooltip != null && composer.tooltip !== "" &&
                <div className="composer-badge-tooltip prevent-select">
                    {composer.tooltip}
                </div>
            }
        </>
    )
}