import React from "react"
import "../../styles/composerModal/infoboxEntry.css"

export default function InfoboxEntry({ title, children }) {
    return (
        <section className="infobox-entry">
            <div className="title">{title}</div>
            <div className="content">
                {children}
            </div>
        </section>
    )
}