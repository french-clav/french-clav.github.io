import React from "react"
import "../styles/main.css"
import DisplaySettingsPanels from "./DisplaySettingsPanels.jsx"
import NoDataPlaceholder from "./NoDataPlaceholder.jsx"
import SuccessionDiagram from "./SuccessionDiagram.jsx"
import Timeline from "./timeline/Timeline.jsx"

export default function Main(props) {
    const allHidden = !props.composerEnvelopes.some(e => e.show) && !props.displaySettings.succession

    return (
        <main className="main relative xy-centerer">
            <div className="relative xy-centerer">
                <Timeline
                    composerEnvelopes={props.composerEnvelopes}
                    displaySettings={props.displaySettings}
                    openComposerModal={props.openComposerModal}
                    periodizations={props.periodizations}
                />
                {props.displaySettings.succession &&
                    <SuccessionDiagram />
                }
                {allHidden &&
                    <NoDataPlaceholder/>
                }
                <DisplaySettingsPanels displaySettings={props.displaySettings} setDisplaySettings={props.setDisplaySettings} />
            </div>
        </main>
    )
}