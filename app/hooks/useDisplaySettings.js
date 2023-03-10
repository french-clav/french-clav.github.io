import { useState } from "react"

const zeroChronologySettings = {
    historicalContext: false,
    suiteTypes: false,
    generations: false
}
const chronologySettingKeys = Object.keys(zeroChronologySettings)

const zeroVisibilitySettings = {
    lifetimes: false,
    publications: false,
    ...zeroChronologySettings,
    succession: false,
}
const visibilityKeys = Object.keys(zeroVisibilitySettings)

const zeroDisplaySettings = {
    ...zeroVisibilitySettings,
    orderByPublications: false,
}

const initialDisplaySettings = {
    ...zeroDisplaySettings,
    lifetimes: true,
    publications: true,
}

export default function useDisplaySettings() {
    const [settings, setSettings] = useState(initialDisplaySettings)

    const filters = [
        resetOthersIfSuccessionEmerged,
        resetSuccessionIfAnyOtherEmerged,
        setLifetimesAndPublicationsIfAnyChronologyEmergedFromZero,
        setOrderByLifetimesIfGenerationsEmerged,
        resetGenerationsIfOrderByLifetimesGone,
        resetOtherChronologiesIfNewEmerged,
    ]

    const exportedSetDisplaySettings =
        (newSettings) => setSettings(applyFilters(settings, newSettings, filters))

    return [settings, exportedSetDisplaySettings]
}

function applyFilters(oldSettings, newSettings, filters) {
    for (const filter of filters) {
        const context = {
            oldSettings,
            newSettings,
            difference: getDifference(oldSettings, newSettings)
        }

        newSettings = filter(context) ?? newSettings
    }

    return newSettings
}

function getDifference(oldSettings, newSettings) {
    const keyValuePairs = Object.keys(oldSettings).map(key => [
        key,
        toInt(newSettings[key]) - toInt(oldSettings[key])
    ])

    return Object.fromEntries(keyValuePairs)

    function toInt(boolean) { return +boolean }
}

function resetOthersIfSuccessionEmerged({ difference }) {
    if (difference.succession > 0) {
        return { ...zeroDisplaySettings, succession: true }
    }
}

function resetSuccessionIfAnyOtherEmerged({ newSettings, difference }) {
    const anySettingBesidesSuccessionEmerged = visibilityKeys.except("succession").some(k => difference[k] > 0)
    if (anySettingBesidesSuccessionEmerged) {
        return { ...newSettings, succession: false }
    }
}

function setLifetimesAndPublicationsIfAnyChronologyEmergedFromZero({ oldSettings, newSettings, difference }) {
    const anyChronologyEmerged = chronologySettingKeys.some(k => difference[k] > 0)
    const noChronologiesBefore = !chronologySettingKeys.some(k => oldSettings[k])
    const noOtherSettingsBesidesChronologiesSelected = !visibilityKeys.exceptAll(chronologySettingKeys).some(k => newSettings[k])

    if (anyChronologyEmerged && noChronologiesBefore && noOtherSettingsBesidesChronologiesSelected) {
        return {
            ...newSettings,
            lifetimes: true,
            publications: true
        }
    }
}

function setOrderByLifetimesIfGenerationsEmerged({ newSettings, difference }) {
    if (difference.generations > 0) {
        return { ...newSettings, orderByPublications: false }
    }
}

function resetGenerationsIfOrderByLifetimesGone({ newSettings, difference }) {
    if (difference.orderByPublications > 0) {
        return { ...newSettings, generations: false }
    }
}

function resetOtherChronologiesIfNewEmerged({ newSettings, difference }) {
    const emergedSettingKey = chronologySettingKeys.find(k => difference[k] > 0)
    if (emergedSettingKey) {
        return { ...newSettings, ...zeroChronologySettings, [emergedSettingKey]: true }
    }
}