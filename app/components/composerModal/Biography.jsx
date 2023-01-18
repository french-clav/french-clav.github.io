import React from "react"
import "../../styles/composerModal/biography.css"

export default function Biography({ composer }) {
    return (
        <div
            className="composer-modal-biogrpahy"
            dangerouslySetInnerHTML={{ __html: composer.bio }}
        />
    )
}