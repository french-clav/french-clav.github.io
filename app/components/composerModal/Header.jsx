import React from "react"
import ComposerPhoto from "./ComposerPhoto.jsx"
import Infobox from "./Infobox.jsx"
import "../../styles/composerModal/header.css"

export default function Header({ composer }) {
    return (
        <div className="composer-modal-header">
            {composer.hasPhoto() &&
                <ComposerPhoto fileName={composer.photoFileName} />
            }
            <Infobox composer={composer} />
        </div>
    )
}