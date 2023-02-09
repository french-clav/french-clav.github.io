import { useEffect, useState } from "react"

export default function useLockableMemo(factory, unlocked, deps) {
    const [value, setValue] = useState(factory())

    useEffect(() => {
        if (unlocked) {
            setValue(factory())
        }
    }, [unlocked, ...deps])

    return value
}