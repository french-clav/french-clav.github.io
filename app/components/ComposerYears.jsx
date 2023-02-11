import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../styles/composerYears.css"
import HighlightableText from "./HighlightableText.jsx"

export default function ComposerYears({ composer, searchQuery, show }) {
    const ref = useRef()

    return (
        <CSSTransition nodeRef={ref} in={show} timeout={250} classNames="composer-years" mountOnEnter>
            <p ref={ref} className="composer-years">
                <HighlightableText
                    text={`${composer.birth?.toYearString() ?? "?"} — ${composer.death?.toYearString() ?? "?"}`}
                    searchQuery={searchQuery}
                />
            </p>
        </CSSTransition>
    )
}