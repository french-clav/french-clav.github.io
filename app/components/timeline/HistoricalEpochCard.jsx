import React from "react"
import "../../styles/timeline/historicalEpochCard.css"

export default function HistoricalEpochCard({ epoch, range }) {
    const fromPoint = range.inverseLerp(epoch.from)
    const toPoint = range.inverseLerp(epoch.to)

    const paddingLeft = "8px" // specified here and not in a .css file because it affects the ultimate width
    const style = {
        paddingLeft,
        left: fromPoint.toPercent(),
        width: `calc(${(toPoint - fromPoint).toPercent()} - ${paddingLeft})`,
        backgroundColor: epoch.color,
    }

    return (
        <div className="historical-epoch-card" style={style}>
            {epoch.name}
        </div>
    )
}