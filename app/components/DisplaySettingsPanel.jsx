import React from "react"

import "../styles/displaySettingsPanel.css"
import DisplaySettingsCheckbox from "./DisplaySettingsCheckbox.jsx"

export default function DisplaySettingsPanel({ displaySettings, setDisplaySettings }) {
    return (
        <div className="display-settings-panel">
            <section>
                <DisplaySettingsCheckbox displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} settingsKey="lifetimes">
                    Годы жизни
                </DisplaySettingsCheckbox>
            </section>
            <section>
                <DisplaySettingsCheckbox displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} settingsKey="publications">
                    Даты издания сборников
                </DisplaySettingsCheckbox>
            </section>
            <section>
                <DisplaySettingsCheckbox displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} settingsKey="historicalContext">
                    Исторический контекст
                </DisplaySettingsCheckbox>
            </section>
            <section>
                <DisplaySettingsCheckbox displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} settingsKey="suiteTypes">
                    Типы сюит
                </DisplaySettingsCheckbox>
            </section>
            <section>
                <DisplaySettingsCheckbox displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} settingsKey="succession">
                    Преемственность
                </DisplaySettingsCheckbox>
            </section>
        </div>
    )
}