import React from "react"
import "../../styles/footer/footer.css"
import HiddenComposerCard from "./HiddenComposerCard.jsx"

export default function Footer({ composerEnvelopes, openComposerModal }) {
    return (
        <div className="footer">
            {composerEnvelopes.map(e => (
                <HiddenComposerCard key={e.composer.name} composerEnvelope={e} openComposerModal={openComposerModal} />
            ))}
        </div>
    )
}