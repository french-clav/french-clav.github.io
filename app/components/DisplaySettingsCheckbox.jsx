import React from "react"

export default function DisplaySettingsCheckbox({
    type = "checkbox",
    checked,
    onChange,
    children
}) {
    return (
        <label className="prevent-select">
            <input
                type={type}
                checked={checked}
                onChange={e => onChange(e.target.checked)}
            />
            <span>{children}</span>
        </label>
    )
}