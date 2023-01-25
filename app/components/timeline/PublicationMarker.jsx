import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../../extensions/numberExtensions.js"
import "../../styles/timeline/publicationMarker.css"
import TimestampRange from "../../util/timestampRange.js"

export default function PublicationMarker({ composer, publication, viewportRange, openComposerModal, displaySettings, historicalEpochs }) {
    const show = displaySettings.publications

    const leftPositionStyle = {
        left: viewportRange.inverseLerp(publication.timestamp).toPercent()
    }

    const markerStyle = {
        ...leftPositionStyle,
        backgroundColor: getOverridenBackgroundColor(publication, displaySettings, historicalEpochs)
    }

    const markerRef = useRef()

    return (
        <CSSTransition nodeRef={markerRef} in={show} timeout={250} classNames="publication-marker">
            <>
                <div
                    ref={markerRef}
                    className="publication-marker"
                    style={markerStyle}
                    onClick ={() => openComposerModal(composer, publication)}
                />
                <div className="publication-marker-tooltip prevent-select" style={leftPositionStyle}>
                    <div className="publication-marker-tooltip-title">Издание нот</div>
                    <div className="publication-marker-tooltip-timestamp">{publication.timestamp.toString()}</div>
                </div>
            </>
        </CSSTransition>
    )
}

function getOverridenBackgroundColor(publication, displaySettings, historicalEpochs) {
    if (!displaySettings.historicalContext) {
        return null
    }

    return historicalEpochs.find(e => e.range.includes(publication.timestamp))?.color
        ?? null
}