import React, { useState } from "react";
import "../styles/main.css";
import DisplaySettingsPanel from "./DisplaySettingsPanel.jsx";
import Timeline from "./timeline/Timeline.jsx";

export default function Main(props) {
    return (
        <main className="main relative xy-centerer">
            <div className="relative xy-centerer">
                {props.composers.length > 0
                    ? <Timeline composers={props.composers} displaySettings={props.displaySettings} />
                    : <div className="no-data-placeholder">Выберете параметры для отображения</div>
                }
                <DisplaySettingsPanel displaySettings={props.displaySettings} setDisplaySettings={props.setDisplaySettings} />
            </div>
        </main>
    )
}