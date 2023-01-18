import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../../styles/composerModal/overlay.css"

export default function Overlay(props) {
    const ref = useRef()

    return (
        <CSSTransition nodeRef={ref} in={props.show} timeout={250} classNames="overlay">
            <div ref={ref} className="overlay" onClick={() => props.closeModal()} />
        </CSSTransition>
    )
}