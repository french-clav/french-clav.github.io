import React from "react"
import EpochRange from "./EpochRange.jsx"

export default function PeriodizationLayer({ periodization, viewportRange, show }) {
    return (
        <>
            {periodization.epochs.map(e => (
                <EpochRange
                    key={e.name}
                    epoch={e}
                    viewportRange={viewportRange}
                    show={show}
                />
            ))}
        </>
    )
}