import React from "react";

import "../styles/displaySettingsPanel.css";
import DisplaySettingsCheckbox from "./DisplaySettingsCheckbox.jsx";

export default function DisplaySettingsPanel(props) {
    const { displaySettings, setDisplaySettings } = props;

    return (
        <div className="display-settings-panel">
            <section>
                <DisplaySettingsCheckbox displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} settingsKey="lifetimes" title="Годы жизни" />
            </section>
            <section>
                <DisplaySettingsCheckbox displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} settingsKey="publications" title="Даты издания нот" />
            </section>
            <section>
                <DisplaySettingsCheckbox displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} settingsKey="historicalContext" title="Исторический контекст" />
            </section>
            <section>
                <DisplaySettingsCheckbox displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} settingsKey="genres" title="Жанровость" />
            </section>
        </div>
    );
}