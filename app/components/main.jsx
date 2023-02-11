import React, { useState } from "react"
import "../styles/main.css"
import DisplaySettingsPanels from "./DisplaySettingsPanels.jsx"
import NoDataPlaceholder from "./NoDataPlaceholder.jsx"
import SuccessionDiagram from "./successionDiagram/SuccessionDiagram.jsx"
import Timeline from "./timeline/Timeline.jsx"

export default function Main(props) {
    const [searchQuery, setSearchQuery] = useState("")

    const composerEnvelopes = searchComposerEnvelopes(props.composerEnvelopes, searchQuery)

    return (
        <main className="main relative xy-centerer">
            <div className="relative xy-centerer">
                <Timeline
                    composerEnvelopes={composerEnvelopes}
                    displaySettings={props.displaySettings}
                    openComposerModal={props.openComposerModal}
                    periodizations={props.periodizations}
                    generations={props.generations}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    show={props.displaySettings.lifetimes || props.displaySettings.publications}
                />
                <SuccessionDiagram
                    successionTree={props.successionTree}
                    successionGroups={props.successionGroups}
                    openComposerModal={props.openComposerModal}
                    show={props.displaySettings.succession}
                />
                {!composerEnvelopes.some(e => e.show) &&
                    <NoDataPlaceholder />
                }
                <DisplaySettingsPanels displaySettings={props.displaySettings} setDisplaySettings={props.setDisplaySettings} />
            </div>
        </main>
    )
}

function searchComposerEnvelopes(composerEnvelopes, query) {
    if (query === '') {
        return composerEnvelopes
    }

    const lowerQuery = query.toLowerCase()

    return composerEnvelopes.map(e => ({
        ...e,
        show: e.show && (
            e.composer.name.toLowerCase().includes(lowerQuery) ||
            (e.composer.birth?.toString().includes(lowerQuery) ?? false) ||
            (e.composer.death?.toString().includes(lowerQuery) ?? false)
        )
    }))
}