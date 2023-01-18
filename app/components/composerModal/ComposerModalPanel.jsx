import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../../styles/composerModal/composerModalPanel.css"

export default function ComposerModalPanel(props) {
    const ref = useRef()

    return (
        <CSSTransition nodeRef={ref} in={props.show} timeout={250} classNames="composer-modal-panel" mountOnEnter>
            <div ref={ref} className="composer-modal-panel">

            </div>
        </CSSTransition>
    )
}