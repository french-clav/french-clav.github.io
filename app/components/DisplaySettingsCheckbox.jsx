import React from "react";

export default function DisplaySettingsCheckbox(props) {
    const {
        displaySettings,
        setDisplaySettings,
        settingsKey,
        title
    } = props;

    return (
        <label className="prevent-select">
            <input
                type="checkbox"
                checked={displaySettings[settingsKey]}
                onChange={e => setDisplaySettings(displaySettings => ({ ...displaySettings, [settingsKey]: e.target.checked }))}
            />
            <span>{title}</span>
        </label>
    );
}