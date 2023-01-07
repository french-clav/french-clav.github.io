import React from "react";
import "../../styles/timeline/tick.css";

export default function Tick(props) {
    return (
        <>
            <div className="grid-tick-line" style={{left: props.offset * 100 + "%"}}></div>
            {props.showLabel &&
                <div className="grid-tick-label" style={{left: props.offset * 100 + "%"}}>
                    {props.year}
                </div>
            }
        </>
    )
}