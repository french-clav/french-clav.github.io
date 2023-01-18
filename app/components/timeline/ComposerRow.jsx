import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../../styles/timeline/composerRow.css"
import PublicationMarker from "./PublicationMarker.jsx"
import ComposerCard from "./ComposerCard.jsx"

export default function ComposerRow(props) {
    const rowRef = useRef()

    const composer = props.composerCard.composer
    const type = props.displaySettings.lifetimes && composer.hasKnownLifetime()
        ? "lifetime"
        : "ghost"

    return (
        <CSSTransition nodeRef={rowRef} in={props.composerCard.show} timeout={250} classNames="composer-row">
            <div ref={rowRef} className="composer-row">
                <ComposerCard
                    composer={composer}
                    range={props.range}
                    type={type}
                    displaySettings={props.displaySettings}
                    openComposerModal={props.openComposerModal}
                />
                {composer.publications.map(p =>
                    <PublicationMarker
                        key={p.timestamp}
                        show={props.displaySettings.publications}
                        composer={composer}
                        publication={p}
                        range={props.range}
                        openComposerModal={props.openComposerModal}
                    />
                )}
            </div>
        </CSSTransition>
    )
}