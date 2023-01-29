import React from "react"

export default function EpochRangeBackground({ epoch: { color } }) {
    const style = {
        background: `linear-gradient(180deg, ${color}46 0%, ${color}26 50px, ${color}16 20%, ${color}13 90%, ${color}05 100%)`
    }

    return (
        <div
            className="zero-pos stretch pointer-transparent"
            style={style}
        />
    )
}