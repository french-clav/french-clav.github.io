import React, { useEffect, useMemo, useRef, useState } from "react"
import { CSSTransition } from "react-transition-group"
import "../../styles/timeline/composerRow.css"
import PublicationMarker from "./PublicationMarker.jsx"
import ComposerCard from "./ComposerCard.jsx"

const rowHeight = 54
const rowMarginTop = 10
const rowStep = rowHeight + rowMarginTop

export default function ComposerRow({
    orderWithinContainer,
    desiredOrder,
    composerCard,
    viewportRange,
    displaySettings,
    openComposerModal,
    activePeriodization
}) {
    const rowRef = useRef()

    const composer = composerCard.composer
    const type = displaySettings.lifetimes && composer.hasKnownLifetime()
        ? "lifetime"
        : "ghost"

    const orderDelta = desiredOrder - orderWithinContainer

    const [translateY, setTranslateY] = useState(orderDelta * rowStep)
    useEffect(() => {
        // Do not change translateY when the composerCard is hidden or disappearing.
        // This removes y-jerking when hiding the rows.
        if (composerCard.show) {
            setTranslateY(orderDelta * rowStep)
        }
    }, [composerCard.show, orderDelta])

    return (
        <CSSTransition nodeRef={rowRef} in={composerCard.show} timeout={250} classNames="composer-row">
            <div ref={rowRef} className="composer-row" style={{ transform: `translateY(${translateY}px)` }}>
                <ComposerCard
                    composer={composer}
                    viewportRange={viewportRange}
                    type={type}
                    displaySettings={displaySettings}
                    openComposerModal={openComposerModal}
                    activePeriodization={activePeriodization}
                />
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