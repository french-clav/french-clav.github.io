import React from "react"
import Overlay from "./Overlay.jsx"
import ComposerModalPanel from "./ComposerModalPanel.jsx"

export default function ComposerModal(props) {
    return (
        <>
            <Overlay displayed={props.displayed} />
            <ComposerModalPanel displayed={props.displayed} />
        </>
    )
}