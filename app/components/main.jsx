import React, { useState } from "react";
import Repository from "../data/respository.js";
import "../styles/main.css";
import DisplaySettingsPanel from "./DisplaySettingsPanel.jsx";
import Timeline from "./timeline/Timeline.jsx";

const defaultDisplaySettings = {
    succession: false,
    publications: true,
    lifetimes: true,
    historicalContext: false,
    genres: false
}

export default function Main() {
    const composers = Repository.getComposers();

    const [displaySettings, setDisplaySettings] = useState(defaultDisplaySettings);

    return (
        <main className="main relative xy-centerer">
            <div className="relative xy-centerer">
                <Timeline composers={composers} displaySettings={displaySettings} />
                <DisplaySettingsPanel displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} />
            </div>
        </main>
    )
}