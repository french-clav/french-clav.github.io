import React, { useState } from "react"
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import Main from "./Main.jsx"
import Repository from "../data/respository.js"
import "../styles/root.css"
import useDisplaySettings from "../hooks/useDisplaySettings.js"

export default function Root() {
    const [displaySettings, setDisplaySettings] = useDisplaySettings()
    const allComposers = Repository.composers

    const composersToDisplay = allComposers.filter(c => hasAnythingToDisplay(c, displaySettings))

    return (
        <div id="root">
            <Header />
            <Main composers={composersToDisplay} displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} />
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