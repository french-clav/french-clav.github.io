import React from "react"
import Overlay from "./Overlay.jsx"
import ComposerModalPanel from "./ComposerModalPanel.jsx"

export default function ComposerModal(props) {
    return (
        <>
            <Overlay show={props.show} />
            <ComposerModalPanel show={props.show} />
        </>
    )
}