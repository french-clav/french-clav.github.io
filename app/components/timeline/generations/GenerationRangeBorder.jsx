import React from "react"
import "../../../styles/timeline/generations/generationRangeBorder.css"

export default function GenerationRangeBorder({ color }) {
    const style = {
        borderImageSource: `linear-gradient(90deg, ${color}30 0%, ${color}30 50%, ${color}30 100%)`
    }

    return (
        <div
            className="zero-pos generation-range-border pointer-transparent"
            style={style}
        />
    )
}