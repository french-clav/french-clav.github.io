import React from "react"
import "../../../styles/timeline/periodization/epochRangeBorder.css"

export default function EpochRangeBorder({ epoch: { color } }) {
    const style = {
        borderImageSource: `linear-gradient(180deg, ${color}30 0%, ${color}30 50px, ${color}20 20%, ${color}10 80%, transparent 100%)`
    }

    return (
        <div
            className="zero-pos epoch-range-border pointer-transparent"
            style={style}
        />
    )
}