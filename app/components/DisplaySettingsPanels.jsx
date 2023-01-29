import React from "react"

import "../styles/displaySettingsPanels.css"
import DisplaySettingsCheckbox from "./DisplaySettingsCheckbox.jsx"

export default function DisplaySettingsPanels({ displaySettings, setDisplaySettings }) {
    return (
        <div className="display-settings-panels-container">
            <DisplaySettingsPanel>
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
            </DisplaySettingsPanel>
            <DisplaySettingsPanel>
                <section>
                    <DisplaySettingsCheckbox displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} settingsKey="historicalContext">
                        Хронология правителей
                    </DisplaySettingsCheckbox>
                </section>
                <section>
                    <DisplaySettingsCheckbox displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} settingsKey="suiteTypes">
                        Типы сюит
                    </DisplaySettingsCheckbox>
                </section>
            </DisplaySettingsPanel>
            <DisplaySettingsPanel>
                <section>
                    <DisplaySettingsCheckbox displaySettings={displaySettings} setDisplaySettings={setDisplaySettings} settingsKey="succession">
                        Преемственность
                    </DisplaySettingsCheckbox>
                </section>
            </DisplaySettingsPanel>
        </div>
    )
}

function DisplaySettingsPanel({ children }) {
    return (
        <div className="display-settings-panel">
            {children}
        </div>
    )
}