import React from "react"
import "../../styles/timeline/rangeContainer.css"

export default function RangeContainer({ range, viewportRange, className, children }) {
    return (
        <div className={`range-container ${className}`} style={calcStyle(range, viewportRange)}>
            {children}
        </div>
    )
}

function calcStyle(range, viewportRange) {
    const startPoint = viewportRange.inverseLerp(range.start)
    const endPoint = viewportRange.inverseLerp(range.end)

    return {
        left: startPoint.toPercent(),
        width: (endPoint - startPoint).toPercent()
    }
}