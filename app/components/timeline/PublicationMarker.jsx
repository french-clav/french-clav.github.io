import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../../extensions/numberExtensions.js"
import "../../styles/timeline/publicationMarker.css"

export default function PublicationMarker({
    composer,
    publication,
    viewportRange,
    openComposerModal,
    show,
    activePeriodization
}) {
    const leftPositionStyle = {
        left: `calc(${viewportRange.inverseLerp(publication.timestamp).toPercent()} - 3px)`
    }

    const markerStyle = {
        ...leftPositionStyle,
        backgroundColor: getOverridenColor(publication, activePeriodization)
    }

    const markerRef = useRef()

    return (
        <CSSTransition nodeRef={markerRef} in={show} timeout={250} classNames="publication-marker">
            <>
                <div
                    ref={markerRef}
                    className="publication-marker"
                    style={markerStyle}
                    onClick={() => openComposerModal(composer, publication)}
                />
                <div className="publication-marker-tooltip prevent-select" style={leftPositionStyle}>
                    <div className="publication-marker-tooltip-title">Издание сборника</div>
                    <div className="publication-marker-tooltip-timestamp">{publication.timestamp.toString()}</div>
                </div>
            </>
        </CSSTransition>
    )
}

function getOverridenColor(publication, activePeriodization) {
    return activePeriodization?.getEpoch(publication.timestamp)?.color ?? null
}