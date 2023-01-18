import React from "react"
import "../styles/main.css"
import DisplaySettingsPanel from "./DisplaySettingsPanel.jsx"
import NoDataPlaceholder from "./NoDataPlaceholder.jsx"
import Timeline from "./timeline/Timeline.jsx"

export default function Main(props) {
    const allHidden = !props.composerCards.some(c => c.show)

    return (
        <main className="main relative xy-centerer">
            <div className="relative xy-centerer">
                <Timeline
                    composerCards={props.composerCards}
                    displaySettings={props.displaySettings}
                    openComposerModal={props.openComposerModal}
                />
                {allHidden && <NoDataPlaceholder/>}
                <DisplaySettingsPanel displaySettings={props.displaySettings} setDisplaySettings={props.setDisplaySettings} />
            </div>
        </main>
    )
}