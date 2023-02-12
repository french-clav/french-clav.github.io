import React, { useState } from "react"
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
    const [searchQuery, setSearchQuery] = useState("")

    const successionTree = Repository.successionTree
    const successionGroups = Repository.successionGroups
    const composerEnvelopes = Repository.composers
        .filter(c => !c.hideFromList)
        .map(c => ({
            composer: c,
            show: shouldShow(c, displaySettings, successionTree, searchQuery)
        }))

    const periodizations = [
        new Periodization("historicalContext", Repository.historicalEpochs, displaySettings.historicalContext),
        new Periodization("suiteTypes", Repository.suiteTypeEpochs, displaySettings.suiteTypes)
    ]

    const generations = Repository.generations

    return (
        <div id="root">
            <Header />
            <Main
                composerEnvelopes={composerEnvelopes}
                displaySettings={displaySettings}
                setDisplaySettings={setDisplaySettings}
                openComposerModal={openComposerModal}
                periodizations={periodizations}
                successionTree={successionTree}
                successionGroups={successionGroups}
                generations={generations}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
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

function shouldShow(composer, displaySettings, successionTree, searchQuery) {
    const showOnTimeline = (
        displaySettings.lifetimes && composer.hasKnownLifetime() ||
        displaySettings.publications && composer.publications.length > 0) &&
        matchesSearchQuery(composer, searchQuery)

    const showOnSuccessionDiagram = displaySettings.succession && successionTree.contains(composer)

    return showOnTimeline || showOnSuccessionDiagram
}

function matchesSearchQuery(composer, query) {
    if (query === '') {
        return true
    }

    const lowerQuery = query.toLowerCase()

    return composer.name.toLowerCase().includes(lowerQuery) ||
        (composer.birth?.toString().includes(lowerQuery) ?? false) ||
        (composer.death?.toString().includes(lowerQuery) ?? false)
}