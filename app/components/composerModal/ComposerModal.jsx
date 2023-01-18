import React from "react"
import Overlay from "./Overlay.jsx"
import Panel from "./Panel.jsx"
import "../../styles/composerModal/composerModal.css"

export default function ComposerModal(props) {
    return (
        <div className={`composer-modal-wrapper ${!props.show && "pointer-transparent"}`}>
            <Overlay show={props.show} closeModal={props.closeModal} />
            <Panel
                show={props.show}
                selectedComposer={props.selectedComposer}
                selectedPublication={props.selectedPublication}
                closeModal={props.closeModal}
            />
        </div>
    )
}