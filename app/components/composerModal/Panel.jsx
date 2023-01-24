import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../../styles/composerModal/panel.css"
import Biography from "./Biography.jsx"
import CloseButton from "./CloseButton.jsx"
import Header from "./Header.jsx"
import Publications from "./Publications.jsx"
import Scroller from "./Scroller.jsx"
import Splitter from "./Splitter.jsx"

export default function Panel({ show, selectedComposer, selectedPublication, closeModal }) {
    const panelRef = useRef()

    return (
        <CSSTransition nodeRef={panelRef} in={show} timeout={250} classNames="composer-modal-panel">
            <div ref={panelRef} className="composer-modal-panel">
                <Scroller show={show}>
                    {selectedComposer != null &&
                        <>
                            <div className="composer-name">
                                {selectedComposer.name}
                            </div>
                            <Header composer={selectedComposer} />
                            <Splitter />
                            <Biography composer={selectedComposer} />
                            {selectedComposer.publications.length > 0 &&
                                <>
                                    <Splitter />
                                    <Publications composer={selectedComposer} selectedPublication={selectedPublication} />
                                </>
                            }
                        </>
                    }
                </Scroller>
                <CloseButton onClick={closeModal} />
            </div>
        </CSSTransition>
    )
}