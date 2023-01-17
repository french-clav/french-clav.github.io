import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../../styles/timeline/composerYears.css"

export default function ComposerYears({ composer, displayed }) {
    const ref = useRef()

    return (
        <CSSTransition nodeRef={ref} in={displayed} timeout={250} classNames="composer-years" mountOnEnter>
            <p ref={ref} className="composer-years">
                {composer.birth?.year ?? "?"} — {composer.death?.year ?? "?"}
            </p>
        </CSSTransition>
    )
}