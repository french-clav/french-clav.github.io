import React from "react";
import Tick from "./tick.jsx";
import "../../styles/timeline/grid.css";

function getTickYear(tick, minDate, maxDate, tickCount) {
    const deltaYears = maxDate.getFullYear() - minDate.getFullYear();
    return minDate.getFullYear() + Math.floor(deltaYears / (tickCount - 1) * tick);
}

function getOffset(tick, tickCount) {
    return tick / (tickCount - 1);
}

export default function TimelineGrid(props) {
    const maxTicks = props.maxTicks ?? 10;

    const deltaYears = props.maxDate.getFullYear() - props.minDate.getFullYear();
    const tickCount = Math.min(maxTicks, deltaYears);

    const ticks = [];
    for (let i = 0; i < tickCount; i++) {
        ticks.push(
            <Tick
                key={i}
                year={getTickYear(i, props.minDate, props.maxDate, tickCount)}
                offset={getOffset(i, tickCount)}
                showLabel={true}
            />
        )
    }

    const intermediateTicks = [];
    for (let i = 0.5; i < tickCount - 1; i++) {
        intermediateTicks.push(
            <Tick
                key={i}
                offset={getOffset(i, tickCount)}
                opacity={0.66}
            />
        )
    }

    return (
        <div className="grid-container xy-centerer zero-pos">
            <div className="grid">
                {ticks}
                {intermediateTicks}
            </div>
        </div>
    );
}