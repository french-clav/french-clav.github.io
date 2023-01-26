import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../../styles/timeline/composerRow.css"
import PublicationMarker from "./PublicationMarker.jsx"
import ComposerCard from "./ComposerCard.jsx"

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

    const rowHeight = 54
    const rowMarginTop = 10
    const orderDelta = desiredOrder - orderWithinContainer

    const style = {
        transform: composerCard.show ? `translateY(${orderDelta * (rowHeight + rowMarginTop)}px)` : "translateY(2000px)"
    }

    return (
        <CSSTransition nodeRef={rowRef} in={composerCard.show} timeout={250} classNames="composer-row">
            <div ref={rowRef} className="composer-row" style={style}>
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