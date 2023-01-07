import React from "react";
import "../../styles/timeline/tick.css";

function toPercent(frac) {
    return `${frac * 100}%`;
}

export default function Tick(props) {
    const opacity = props.opacity ?? 1;

    return (
        <>
            <div className="grid-tick-line" style={{left: toPercent(props.offset), opacity: opacity}}></div>
            {props.showLabel &&
                <div className="grid-tick-label" style={{left: toPercent(props.offset), opacity: opacity}}>
                    {props.year}
                </div>
            }
        </>
    )
}