import React from "react";
import GridTick from "./GridTick.jsx";
import "../../styles/timeline/grid.css";

function getOffset(tick, tickCount) {
    return tick / (tickCount - 1);
}

export default function TimelineGrid(props) {
    const maxTicks = props.maxTicks ?? 10;

    const deltaYears = props.range.end.year - props.range.start.year;
    const tickCount = Math.min(maxTicks, deltaYears + 1);

    const ticks = [];
    for (let tickIdx = 0; tickIdx < tickCount; tickIdx++) {
        const t = getOffset(tickIdx, tickCount);
        ticks.push(
            <GridTick
                key={tickIdx}
                year={props.range.lerp(t).year}
                offset={t}
                showLabel={true}
            />
        )
    }

    const intermediateTicks = [];
    for (let tickIdx = 0.5; tickIdx < tickCount - 1; tickIdx++) {
        intermediateTicks.push(
            <GridTick
                key={tickIdx}
                offset={getOffset(tickIdx, tickCount)}
                opacity={0.5}
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