import React from "react"
import "../../styles/composerModal/infobox.css"
import InfoboxEntry from "./InfoboxEntry.jsx"

export default function Infobox({ composer }) {
    return (
        <div className="composer-modal-infobox">
            <InfoboxEntry title="Рождение">
                {composer.birth?.toString() ?? "?"}
            </InfoboxEntry>
            <InfoboxEntry title="Смерть">
                {composer.death?.toString() ?? "?"}
            </InfoboxEntry>
        </div>
    )
}