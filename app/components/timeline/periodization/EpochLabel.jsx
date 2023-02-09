import React from "react"
import "../../../styles/timeline/periodization/epochLabel.css"

export default function EpochLabel({ children, className, color, align, show }) {
    align = align ?? "center"

    return (
        <div
            className={`epoch-label-container ${show ? "epoch-label-container-shown" : ""}`}
            style={{ alignItems: align }}
        >
            <div className={`${className ?? ""} epoch-label`} style={{ backgroundColor: `${color}50`, border: `1px solid ${color}dd` }}>
                <p>
                    {children}
                </p>
            </div>
        </div>
    )
}