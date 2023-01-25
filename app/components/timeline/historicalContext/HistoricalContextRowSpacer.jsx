import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../../../styles/timeline/historicalContext/historicalContextRowSpacer.css"

export default function HistoricalContextRowSpacer({ show }) {
    const ref = useRef()

    return (
        <CSSTransition
            nodeRef={ref}
            in={show}
            timeout={{ appear: 0, enter: 250, exit: 250 }}
            classNames="historical-context-row-spacer"
            appear
        >
            <div ref={ref} className="historical-context-row-spacer" />
        </CSSTransition>
    )
}