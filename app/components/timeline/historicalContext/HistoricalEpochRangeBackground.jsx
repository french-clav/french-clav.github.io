import React from "react"
import "../../../styles/timeline/historicalContext/historicalEpochRangeBackground.css"

export default function HistoricalEpochRangeBackground({ epoch: { color } }) {
    const style = {
        background: `linear-gradient(180deg, ${color}26 0%, ${color}26 20px, ${color}08 20%, ${color}05 80%, transparent 100%)`
    }

    return (
        <div
            className="zero-pos stretch historical-epoch-range-background pointer-transparent"
            style={style}
        />
    )
}