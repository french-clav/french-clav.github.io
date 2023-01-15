import React from "react";
import "../../styles/timeline/tick.css";
import "../../extensions/numberExtensions.js"

export default function GridTick(props) {
    const opacity = props.opacity ?? 1;

    return (
        <>
            <div className="grid-tick-line" style={{ left: props.offset.toPercent(), opacity: opacity }}></div>
            {props.showLabel &&
                <div className="grid-tick-label prevent-select" style={{ left: props.offset.toPercent(), opacity: opacity }}>
                    {props.year}
                </div>
            }
        </>
    )
}