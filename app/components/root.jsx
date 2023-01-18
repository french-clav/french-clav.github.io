import React, { useEffect, useState } from "react"
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import Main from "./Main.jsx"
import Repository from "../data/respository.js"
import "../styles/root.css"
import useDisplaySettings from "../hooks/useDisplaySettings.js"
import ComposerModal from "./composerModal/ComposerModal.jsx"
import Overlay from "./composerModal/Overlay.jsx"

export default function Root() {
    const [displaySettings, setDisplaySettings] = useDisplaySettings()

    const composers = Repository.composers
    const composerCards = composers.map(c => ({
        composer: c,
        show: hasAnythingToDisplay(c, displaySettings)
    }))
    return (
        <div id="root">
            <Header />
            <Main composerCards={composerCards} displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} />
            <ComposerModal />
            <Footer />
        </div>
    )
}

function hasAnythingToDisplay(composer, displaySettings) {
    return displaySettings.historicalContext ||
        displaySettings.genres ||
        displaySettings.lifetimes && composer.hasKnownLifetime() ||
        displaySettings.publications && composer.publications.length > 0
}