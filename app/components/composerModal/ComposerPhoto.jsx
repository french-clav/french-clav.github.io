import React from "react"
import "../../styles/composerModal/composerPhoto.css"
import { buildComposerPhotoUrl } from "../../paths.js"

export default function ComposerPhoto({ fileName }) {
    return (
        <div className="composer-photo-frame">
            <img src={buildComposerPhotoUrl(fileName)} className="composer-photo" />
        </div>
    )
}