import { useState } from "react";
import _ from "lodash";

const zeroDisplaySettings = {
    succession: false,
    publications: false,
    lifetimes: false,
    historicalContext: false,
    genres: false
}

const initialDisplaySettings = {
    ...zeroDisplaySettings,
    publications: true,
    lifetimes: true,
}

export default function useDisplaySettings() {
    const [value, setValue] = useState(initialDisplaySettings);

    const filter = (newValue) => {
        if (!value.succession && newValue.succession) {
            return { ...zeroDisplaySettings, succession: true };
        }

        const anySettingBesidesSuccessionSet = !_.isEqual({ ...newValue, succession: false }, zeroDisplaySettings);
        if (value.succession && anySettingBesidesSuccessionSet) {
            return { ...newValue, succession: false };
        }

        return newValue;
    }

    const setDisplaySettings = (newValue) => setValue(filter(newValue));

    return [value, setDisplaySettings];
}