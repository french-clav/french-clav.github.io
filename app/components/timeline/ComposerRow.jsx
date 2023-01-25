import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../../styles/timeline/composerRow.css"
import PublicationMarker from "./PublicationMarker.jsx"
import ComposerCard from "./ComposerCard.jsx"

export default function ComposerRow({ composerCard, viewportRange, displaySettings, openComposerModal, historicalEpochs }) {
    const rowRef = useRef()

    const composer = composerCard.composer
    const type = displaySettings.lifetimes && composer.hasKnownLifetime()
        ? "lifetime"
        : "ghost"

    return (
        <CSSTransition nodeRef={rowRef} in={composerCard.show} timeout={250} classNames="composer-row">
            <div ref={rowRef} className="composer-row">
                <ComposerCard
                    composer={composer}
                    viewportRange={viewportRange}
                    type={type}
                    displaySettings={displaySettings}
                    openComposerModal={openComposerModal}
                />
                {composer.publications.map(p =>
                    <PublicationMarker
                        key={p.timestamp}
                        composer={composer}
                        publication={p}
                        viewportRange={viewportRange}
                        openComposerModal={openComposerModal}
                        displaySettings={displaySettings}
                        historicalEpochs={historicalEpochs}
                    />
                )}
            </div>
        </CSSTransition>
    )
}