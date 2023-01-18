import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../../styles/composerModal/panel.css"
import Biography from "./Biography.jsx"
import CloseButton from "./CloseButton.jsx"
import Header from "./Header.jsx"
import Splitter from "./Splitter.jsx"

export default function Panel({ show, selectedComposer, selectedPublication, closeModal }) {
    const ref = useRef()

    return (
        <CSSTransition nodeRef={ref} in={show} timeout={250} classNames="composer-modal-panel">
            <div ref={ref} className="composer-modal-panel">
                <div className="composer-modal-scroller">
                    <div className="composer-modal-content">
                        {selectedComposer != null &&
                            <>
                                <Header composer={selectedComposer} />
                                <Splitter />
                                <Biography composer={selectedComposer}/>
                            </>
                        }
                    </div>
                </div>
                <CloseButton onClick={closeModal}/>
            </div>
        </CSSTransition>
    )
}