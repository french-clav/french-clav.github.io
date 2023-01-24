import React from "react"
import "../../styles/footer/footer.css"
import HiddenComposerCard from "./HiddenComposerCard.jsx"

export default function Footer({ composerCards }) {
    return (
        <div className="footer">
            {composerCards.map(card => (
                <HiddenComposerCard key={card.composer.name} composerCard={card} />
            ))}
        </div>
    )
}