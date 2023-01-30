import React from "react"
import Header from "./Header.jsx"
import Footer from "./footer/Footer.jsx"
import Main from "./Main.jsx"
import Repository from "../data/respository.js"
import "../styles/root.css"
import useDisplaySettings from "../hooks/useDisplaySettings.js"
import ComposerModal from "./composerModal/ComposerModal.jsx"
import useComposerModalState from "../hooks/useComposerModalState.js"
import Periodization from "../data/periodization.js"

export default function Root() {
    const [displaySettings, setDisplaySettings] = useDisplaySettings()
    const [composerModalState, openComposerModal, closeComposerModal] = useComposerModalState()

    const composerEnvelopes = Repository.composers
        .filter(c => !c.hideFromList)
        .map(c => ({
            composer: c,
            show: shouldShow(c, displaySettings)
        }))

    const periodizations = [
        new Periodization("historicalContext", Repository.historicalEpochs, displaySettings.historicalContext),
        new Periodization("suiteTypes", Repository.suiteTypeEpochs, displaySettings.suiteTypes)
    ]

    return (
        <div id="root">
            <Header />
            <Main
                composerEnvelopes={composerEnvelopes}
                displaySettings={displaySettings}
                setDisplaySettings={setDisplaySettings}
                openComposerModal={openComposerModal}
                periodizations={periodizations}
            />
            <ComposerModal
                show={composerModalState.isOpen}
                selectedComposer={composerModalState.selectedComposer}
                selectedPublication={composerModalState.selectedPublication}
                closeModal={closeComposerModal}
            />
            <Footer
                composerEnvelopes={composerEnvelopes}
                openComposerModal={openComposerModal}
            />
        </div>
    )
}

function shouldShow(composer, displaySettings) {
    return displaySettings.lifetimes && composer.hasKnownLifetime() ||
        displaySettings.publications && composer.publications.length > 0
}