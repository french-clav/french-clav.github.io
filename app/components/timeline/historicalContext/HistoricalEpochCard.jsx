import React from "react"
import { CSSTransition } from "react-transition-group"
import "../../../styles/timeline/historicalContext/historicalEpochCard.css"

export default function HistoricalEpochCard({ epoch, show }) {
    return (
        <div className={`historical-epoch-range-card-container ${show ? "historical-epoch-range-card-container-shown" : ""}`}>
            <div className="historical-epoch-range-card" style={{ backgroundColor: `${epoch.color}50` }}>
                <p>
                    {epoch.name}
                </p>
            </div>
        </div>
    )
}