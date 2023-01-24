import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../../styles/footer/hiddenComposerCard.css"

export default function HiddenComposerCard({ composerCard, openComposerModal }) {
    const cardRef = useRef()

    return (
        <CSSTransition nodeRef={cardRef} in={!composerCard.show} timeout={250} classNames="hidden-composer-card">
            <div
                ref={cardRef}
                className="hidden-composer-card prevent-select"
                onClick={() => openComposerModal(composerCard.composer)}
            >
                {composerCard.composer.name}
            </div>
        </CSSTransition>
    )
}