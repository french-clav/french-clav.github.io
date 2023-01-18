import React from "react"
import GridTick from "./GridTick.jsx"
import "../../styles/timeline/grid.css"

function makeTick(tickIdx, tickCount, range) {
    const t = tickIdx / (tickCount - 1)
    const timestamp = range.lerp(t)
    const tSnappedToYear = range.inverseLerp(timestamp.startOfYear())

    return { t: tSnappedToYear, year: timestamp.year }
}

export default function TimelineGrid(props) {
    const maxTicks = props.maxTicks ?? 10

    const deltaYears = props.range.end.year - props.range.start.year
    const tickCount = Math.min(maxTicks, deltaYears + 1)

    const ticks = []
    for (let tickIdx = 0; tickIdx < tickCount; tickIdx++) {
        const { t, year } = makeTick(tickIdx, tickCount, props.range)
        ticks.push(
            <GridTick
                key={tickIdx}
                year={year}
                offset={t}
                showLabel
            />
        )
    }

    const intermediateTicks = []
    for (let tickIdx = 0.5; tickIdx < tickCount - 1; tickIdx++) {
        intermediateTicks.push(
            <GridTick
                key={tickIdx}
                offset={makeTick(tickIdx, tickCount, props.range).t}
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
    )
}