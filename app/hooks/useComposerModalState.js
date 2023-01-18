import { useState } from "react"

export default function useComposerModalState() {
    const [isOpen, setOpen] = useState(false)
    const [selectedComposer, setSelectedComposer] = useState(null)
    const [selectedPublication, setSelectedPublication] = useState(null)

    const state = {
        isOpen,
        selectedComposer,
        selectedPublication
    }

    const open = (composer, publication) => {
        setSelectedComposer(composer)
        setSelectedPublication(publication ?? null)
        setOpen(true)
    }

    const close = () => { setOpen(false) }

    return [state, open, close]
}