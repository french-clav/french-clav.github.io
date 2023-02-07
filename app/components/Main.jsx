import React from "react"
import "../styles/main.css"
import DisplaySettingsPanels from "./DisplaySettingsPanels.jsx"
import NoDataPlaceholder from "./NoDataPlaceholder.jsx"
import SuccessionDiagram from "./successionDiagram/SuccessionDiagram.jsx"
import Timeline from "./timeline/Timeline.jsx"

export default function Main(props) {
    const allHidden = props.composerEnvelopes.every(e => !e.show)

    return (
        <main className="main relative xy-centerer">
            <div className="relative xy-centerer">
                <Timeline
                    composerEnvelopes={props.composerEnvelopes}
                    displaySettings={props.displaySettings}
                    openComposerModal={props.openComposerModal}
                    periodizations={props.periodizations}
                    show={props.displaySettings.lifetimes || props.displaySettings.publications}
                />
                {props.displaySettings.succession &&
                    <SuccessionDiagram
                        successionTree={props.successionTree}
                        successionGroups={props.successionGroups}
                        openComposerModal={props.openComposerModal}
                    />
                }
                {allHidden &&
                    <NoDataPlaceholder />
                }
                <DisplaySettingsPanels displaySettings={props.displaySettings} setDisplaySettings={props.setDisplaySettings} />
            </div>
        </main>
    )
}