import React from "react"

export default function DisplaySettingsCheckbox(props) {
    const {
        displaySettings,
        setDisplaySettings,
        settingsKey,
        children
    } = props

    return (
        <label className="prevent-select">
            <input
                type="checkbox"
                checked={displaySettings[settingsKey]}
                onChange={e => setDisplaySettings({ ...displaySettings, [settingsKey]: e.target.checked })}
            />
            <span>{children}</span>
        </label>
    )
}