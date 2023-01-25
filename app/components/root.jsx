import React from "react"
import Header from "./Header.jsx"
import Footer from "./footer/Footer.jsx"
import Main from "./Main.jsx"
import Repository from "../data/respository.js"
import "../styles/root.css"
import useDisplaySettings from "../hooks/useDisplaySettings.js"
import ComposerModal from "./composerModal/ComposerModal.jsx"
import useComposerModalState from "../hooks/useComposerModalState.js"

export default function Root() {
    const [displaySettings, setDisplaySettings] = useDisplaySettings()
    const [composerModalState, openComposerModal, closeComposerModal] = useComposerModalState()

    const composerCards = Repository.composers.map(c => ({
        composer: c,
        show: hasAnythingToDisplay(c, displaySettings)
    }))

    const historicalEpochs = Repository.historicalEpochs

    return (
        <div id="root">
            <Header />
            <Main
                composerCards={composerCards}
                displaySettings={displaySettings}
                setDisplaySettings={setDisplaySettings}
                openComposerModal={openComposerModal}
                historicalEpochs={historicalEpochs}
            />
            <ComposerModal
                show={composerModalState.isOpen}
                selectedComposer={composerModalState.selectedComposer}
                selectedPublication={composerModalState.selectedPublication}
                closeModal={closeComposerModal}
            />
            <Footer
                composerCards={composerCards}
                openComposerModal={openComposerModal}
            />
        </div>
    )
}

function hasAnythingToDisplay(composer, displaySettings) {
    return displaySettings.lifetimes && composer.hasKnownLifetime() ||
        displaySettings.publications && composer.publications.length > 0
}