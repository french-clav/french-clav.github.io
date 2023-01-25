import React from "react"
import "../../../styles/timeline/historicalContext/historicalContextRow.css"
import HistoricalEpochRange from "./HistoricalEpochRange.jsx"

export default function HistoricalContextRow({ epochs, viewportRange, show }) {
    return (
        <>
            {epochs.map(e => (
                <HistoricalEpochRange
                    key={e.name}
                    epoch={e}
                    viewportRange={viewportRange}
                    show={show}
                />
            ))}
        </>
    )
}