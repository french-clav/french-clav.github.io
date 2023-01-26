import React from "react"
import "../../../styles/timeline/periodization/epochLabel.css"

export default function EpochLabel({ epoch, show }) {
    return (
        <div className={`epoch-label-container ${show ? "epoch-label-container-shown" : ""}`}>
            <div className="epoch-label" style={{ backgroundColor: `${epoch.color}50`, border: `1px solid ${epoch.color}dd` }}>
                <p>
                    {epoch.name}
                </p>
            </div>
        </div>
    )
}