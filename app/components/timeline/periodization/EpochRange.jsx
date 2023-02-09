import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../../../styles/timeline/periodization/epochRange.css"
import EpochLabel from "./EpochLabel.jsx"
import EpochRangeBackground from "./EpochRangeBackground.jsx"
import EpochRangeBorder from "./EpochRangeBorder.jsx"

export default function EpochRange({ epoch, viewportRange, show }) {
    const startPoint = Math.max(0, viewportRange.inverseLerp(epoch.range.start))
    const endPoint = Math.min(1, viewportRange.inverseLerp(epoch.range.end))

    const style = {
        left: startPoint.toPercent(),
        width: (endPoint - startPoint).toPercent(),
    }

    const rangeRef = useRef()

    return (
        <CSSTransition nodeRef={rangeRef} in={show} timeout={250} classNames="epoch-range">
            <div ref={rangeRef} className="epoch-range pointer-transparent" style={style}>
                <EpochRangeBorder color={epoch.color} />
                <EpochRangeBackground color={epoch.color} />
                <EpochLabel color={epoch.color} show={show}>
                    {epoch.name}
                </EpochLabel>
            </div>
        </CSSTransition>
    )
}