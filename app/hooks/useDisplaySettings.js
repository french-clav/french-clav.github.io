import { useState } from "react"
import _ from "lodash"

const zeroDisplaySettings = {
    succession: false,
    publications: false,
    lifetimes: false,
    historicalContext: false,
    suiteTypes: false
}

const initialDisplaySettings = {
    ...zeroDisplaySettings,
    publications: true,
    lifetimes: true,
}

export default function useDisplaySettings() {
    const [value, setValue] = useState(initialDisplaySettings)

    const filters = [
        resetOthersIfSuccessionEmerged,
        resetSuccessionIfOthersEmerged,
        resetHistoricalContextIfSuiteTypesEmerged,
        resetSuiteTypesIfHistoricalContextEmerged
    ]

    const setDisplaySettings = (newValue) => setValue(applyFilters(value, newValue, filters))

    return [value, setDisplaySettings]
}

function applyFilters(oldValue, newValue, filters) {
    for (const filter of filters) {
        newValue = filter(oldValue, newValue) ?? newValue
    }

    return newValue
}

function resetOthersIfSuccessionEmerged(oldValue, newValue) {
    if (!oldValue.succession && newValue.succession) {
        return { ...zeroDisplaySettings, succession: true }
    }
}

function resetSuccessionIfOthersEmerged(oldValue, newValue) {
    const anySettingBesidesSuccessionSelected = !_.isEqual({ ...newValue, succession: false }, zeroDisplaySettings)
    if (oldValue.succession && anySettingBesidesSuccessionSelected) {
        return { ...newValue, succession: false }
    }
}

function resetHistoricalContextIfSuiteTypesEmerged(oldValue, newValue) {
    if (oldValue.historicalContext && newValue.suiteTypes) {
        return { ...newValue, historicalContext: false }
    }
}

function resetSuiteTypesIfHistoricalContextEmerged(oldValue, newValue) {
    if (oldValue.suiteTypes && newValue.historicalContext) {
        return { ...newValue, suiteTypes: false }
    }
}