import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../styles/composerYears.css"

export default function ComposerYears({ composer, show }) {
    const ref = useRef()

    return (
        <CSSTransition nodeRef={ref} in={show} timeout={250} classNames="composer-years" mountOnEnter>
            <p ref={ref} className="composer-years">
                {composer.birth?.toYearString() ?? "?"} — {composer.death?.toYearString() ?? "?"}
            </p>
        </CSSTransition>
    )
}