import React from "react"

export default function GenerationRangeBackground({ color }) {
    const style = {
        background: `linear-gradient(180deg, ${color}46 0%, ${color}26 2%, ${color}16 5%, ${color}16 95%, ${color}26 98%, ${color}46 100%)`
    }

    return (
        <div
            className="zero-pos stretch pointer-transparent"
            style={style}
        />
    )
}