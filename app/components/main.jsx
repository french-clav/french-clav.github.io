import React, { useState } from "react";
import "../styles/main.css";
import DisplaySettingsPanel from "./DisplaySettingsPanel.jsx";
import Timeline from "./timeline/Timeline.jsx";

export default function Main(props) {
    return (
        <main className="main relative xy-centerer">
            <div className="relative xy-centerer">
                <Timeline composers={props.composers} displaySettings={props.displaySettings} />
                <DisplaySettingsPanel displaySettings={props.displaySettings} setDisplaySettings={props.setDisplaySettings} />
            </div>
        </main>
    )
}