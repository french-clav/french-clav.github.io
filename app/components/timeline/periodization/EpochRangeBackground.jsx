import React from "react"

export default function EpochRangeBackground({ epoch: { color } }) {
    const style = {
        background: `linear-gradient(180deg, ${color}26 0%, ${color}26 20px, ${color}08 20%, ${color}05 80%, transparent 100%)`
    }

    return (
        <div
            className="zero-pos stretch pointer-transparent"
            style={style}
        />
    )
}