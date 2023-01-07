import React from "react";
import useDimensions from "../../hooks/useDimensions.js";
import Tick from "./tick.jsx";
import "../../styles/timeline/grid.css";

function getTickYear(minDate, maxDate, ticks, tick) {
    const deltaYears = maxDate.getFullYear() - minDate.getFullYear();
    return minDate.getFullYear() + Math.floor(deltaYears / (ticks - 1) * tick);
}

export default function TimelineGrid(props) {
    // const [gridRef, dimensions] = useDimensions();

    const maxTicks = props.maxTicks ?? 11;

    const deltaYears = props.maxDate.getFullYear() - props.minDate.getFullYear();
    const tickCount = Math.min(maxTicks, deltaYears);

    const ticks = [];
    for (let i = 0; i < tickCount; i++) {
        const offset = i / (tickCount - 1);
        const year = getTickYear(props.minDate, props.maxDate, tickCount, i);
        const showLabel = i % 2 == 0 || i == tickCount - 1;
        ticks.push(<Tick key={i} offset={offset} showLabel={showLabel} year={year}/>)
    }

    return (
        <div className="xy-centerer zero-pos">
            <div className="grid">
                {ticks}
            </div>
        </div>
    );
}