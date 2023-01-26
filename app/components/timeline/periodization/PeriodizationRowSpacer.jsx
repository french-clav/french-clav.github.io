import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../../../styles/timeline/periodization/periodizationRowSpacer.css"

export default function PeriodizationRowSpacer({ show }) {
    const ref = useRef()

    return (
        <CSSTransition
            nodeRef={ref}
            in={show}
            timeout={{ appear: 0, enter: 250, exit: 250 }}
            classNames="periodization-row-spacer"
            appear
        >
            <div ref={ref} className="periodization-row-spacer" />
        </CSSTransition>
    )
}