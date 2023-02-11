import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import PublicationMarker from "./PublicationMarker.jsx"
import ComposerBadge from "../ComposerBadge.jsx"
import RangeContainer from "./RangeContainer.jsx"
import classNames from "../../util/classNames.js"
import "../../styles/timeline/composerRow.css"
import "../../styles/composerCard.css"
import "../../styles/timeline/composerGhost.css"
import useLockableMemo from "../../hooks/useLockableMemo.js"

const rowHeight = 54
const rowMargins = 10
const rowStep = rowHeight + rowMargins

export default function ComposerRow({
    orderWithinContainer,
    desiredOrder,
    composerEnvelope: { composer, show },
    viewportRange,
    displaySettings,
    openComposerModal,
    activeColorizer,
    searchQuery
}) {
    const rowRef = useRef()

    const type = displaySettings.lifetimes && composer.hasKnownLifetime()
        ? "lifetime"
        : "ghost"

    const orderAdjustment = desiredOrder - orderWithinContainer

    // Do not change translateY when the composer row is hidden or disappearing.
    // This removes y-jerking when hiding the rows.
    const translateY = useLockableMemo(() => orderAdjustment * rowStep, show, [orderAdjustment])

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
                            "colorless": activeColorizer != null,
                            "composer-card": type === "lifetime",
                            "composer-ghost relative": type === "ghost"
                        })}
                        showLifetime={displaySettings.lifetimes}
                        onClick={() => openComposerModal(composer)}
                        searchQuery={searchQuery}
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
                        activeColorizer={activeColorizer}
                    />
                )}
            </div>
        </CSSTransition>
    )
}