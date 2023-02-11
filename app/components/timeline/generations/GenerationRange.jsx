import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import useLockableMemo from "../../../hooks/useLockableMemo.js"
import "../../../styles/timeline/generations/generationRange.css"
import EpochLabel from "../periodization/EpochLabel.jsx"
import GenerationRangeBackground from "./GenerationRangeBackground.jsx"
import GenerationRangeBorder from "./GenerationRangeBorder.jsx"

const rowHeight = 54
const rowMargins = 10
const rowStep = rowHeight + rowMargins

export default function GenerationRange({ generation, orderedComposers, show }) {
    const top = orderedComposers.indexOf(generation.first) * rowStep
    const bottom = (orderedComposers.indexOf(generation.last) + 1) * rowStep

    const positionStyle = useLockableMemo(() => ({
        top: top,
        height: bottom - top,
    }), show, [top, bottom])

    const rangeRef = useRef()

    return (
        <CSSTransition nodeRef={rangeRef} in={show} timeout={250} classNames="generation-range">
            <div className="generation-range pointer-transparent" ref={rangeRef} style={positionStyle}>
                {!generation.isWeak &&
                    <GenerationRangeBackground color={generation.color} />
                }
                <GenerationRangeBorder color={generation.color} isWeak={generation.isWeak} />
                <EpochLabel className={`generation-label ${generation.isWeak ? "generation-label-weak" : ""}`} color={generation.color} align="end" show={show}>
                    {generation.name}
                </EpochLabel>
            </div>
        </CSSTransition>
    )
}