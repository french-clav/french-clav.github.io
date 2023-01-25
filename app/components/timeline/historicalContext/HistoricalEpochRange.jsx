import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../../../styles/timeline/historicalContext/historicalEpochRange.css"
import HistoricalEpochCard from "./HistoricalEpochCard.jsx"
import HistoricalEpochRangeBackground from "./HistoricalEpochRangeBackground.jsx"
import HistoricalEpochRangeBorder from "./HistoricalEpochRangeBorder.jsx"

export default function HistoricalEpochRange({ epoch, viewportRange, show }) {
    const startPoint = Math.max(0, viewportRange.inverseLerp(epoch.start))
    const endPoint = Math.min(1, viewportRange.inverseLerp(epoch.end))

    const style = {
        left: startPoint.toPercent(),
        width: (endPoint - startPoint).toPercent(),
    }

    const rangeRef = useRef()

    return (
        <CSSTransition nodeRef={rangeRef} in={show} timeout={250} classNames="historical-epoch-range">
            <div ref={rangeRef} className="historical-epoch-range pointer-transparent" style={style}>
                <HistoricalEpochRangeBorder epoch={epoch} />
                <HistoricalEpochRangeBackground epoch={epoch} />
                <HistoricalEpochCard epoch={epoch} show={show} />
            </div>
        </CSSTransition>
    )
}