import React from "react"
import "../styles/main.css"
import DisplaySettingsPanel from "./DisplaySettingsPanel.jsx"
import Timeline from "./timeline/Timeline.jsx"

export default function Main(props) {
    return (
        <main className="main relative xy-centerer">
            <div className="relative xy-centerer">
                <Timeline composerCards={props.composerCards} displaySettings={props.displaySettings} />
                {!props.composerCards.some(c => c.displayed) &&
                    <div className="relative zero-pos xy-centerer">
                        <div className="no-data-placeholder prevent-select">Выберете параметры для отображения</div>
                    </div>
                }
                <DisplaySettingsPanel displaySettings={props.displaySettings} setDisplaySettings={props.setDisplaySettings} />
            </div>
        </main>
    )
}