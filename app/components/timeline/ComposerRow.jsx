import React, { useEffect, useRef, useState } from "react"
import { CSSTransition } from "react-transition-group"
import PublicationMarker from "./PublicationMarker.jsx"
import ComposerBadge from "../ComposerBadge.jsx"
import RangeContainer from "./RangeContainer.jsx"
import classNames from "../../util/classNames.js"
import "../../styles/timeline/composerRow.css"
import "../../styles/composerCard.css"
import "../../styles/timeline/composerGhost.css"

const rowHeight = 54
const rowMarginTop = 10
const rowStep = rowHeight + rowMarginTop

export default function ComposerRow({
    orderWithinContainer,
    desiredOrder,
    composerEnvelope: { composer, show },
    viewportRange,
    displaySettings,
    openComposerModal,
    activePeriodization
}) {
    const rowRef = useRef()

    const type = displaySettings.lifetimes && composer.hasKnownLifetime()
        ? "lifetime"
        : "ghost"

    const orderDelta = desiredOrder - orderWithinContainer

    const [translateY, setTranslateY] = useState(orderDelta * rowStep)
    useEffect(() => {
        // Do not change translateY when the composer row is hidden or disappearing.
        // This removes y-jerking when hiding the rows.
        if (show) {
            setTranslateY(orderDelta * rowStep)
        }
    }, [show, orderDelta])

    return (
        <CSSTransition nodeRef={rowRef} in={show} timeout={250} classNames="composer-row">
            <div ref={rowRef} className="composer-row" style={{ transform: `translateY(${translateY}px)` }}>
                <RangeContainer
                    className="range-container-animated"
                    range={type == "lifetime" ? composer.lifetime : viewportRange}
                    viewportRange={viewportRange}
                >
                    <ComposerBadge
                        composer={composer}
                        className={classNames({
                            "composer-badge-animated": true,
                            "colorless": activePeriodization != null,
                            "composer-card": type === "lifetime",
                            "composer-ghost relative": type === "ghost"
                        })}
                        showLifetime={displaySettings.lifetimes}
                        onClick={() => openComposerModal(composer)}
                    />
                </RangeContainer>
                {composer.publications.map(p =>
                    <PublicationMarker
                        key={p.timestamp}
                        composer={composer}
                        publication={p}
                        viewportRange={viewportRange}
                        openComposerModal={openComposerModal}
                        show={displaySettings.publications}
                        activePeriodization={activePeriodization}
                    />
                )}
            </div>
        </CSSTransition>
    )
}