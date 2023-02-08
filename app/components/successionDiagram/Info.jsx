import React from "react"
import "../../styles/successionDiagram/info.css"

export default function Info({ children }) {
    return (
        <>
            <div className="succession-diagram-info prevent-select">
                <span>i</span>
                <div className="succession-diagram-info-tooltip prevent-select">
                    {children}
                </div>
            </div>
        </>
    )
}