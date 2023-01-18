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
        <CSSTransition nodeRef={rowRef} in={props.composerCard.displayed} timeout={250} classNames="composer-row">
            <div ref={rowRef} className="composer-row">
                <ComposerCard composer={composer} range={props.range} type={type} displaySettings={props.displaySettings} />
                {composer.publications.map(p =>
                    <PublicationMarker key={p.timestamp} publication={p} range={props.range} displayed={props.displaySettings.publications} />
                )}
            </div>
        </CSSTransition>
    )
}