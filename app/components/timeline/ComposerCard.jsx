import React from "react"
import ComposerYears from "./ComposerYears.jsx"
import "../../extensions/numberExtensions.js"
import "../../styles/timeline/composerLifetime.css"
import "../../styles/timeline/composerGhost.css"
import "../../styles/timeline/composerCard.css"

export default function ComposerCard(props) {
    const composer = props.composer
    const type = props.type

    const style = type == "lifetime"
        ? calcLifetimeStyle(props.composer, props.range)
        : null

    const classNames = {
        lifetime: "composer-lifetime",
        ghost: "composer-ghost relative"
    }

    return (
        <div className={`composer-card ${classNames[type]}`} style={style}>
            <p className="composer-name">{composer.name}</p>
            <ComposerYears composer={composer} displayed={type == "lifetime"}/>
        </div>
    )
}

function calcLifetimeStyle(composer, range) {
    const birthPoint = range.inverseLerp(composer.birth)
    const deathPoint = range.inverseLerp(composer.death)

    const paddingLeft = "8px" // specified here and not in a .css file because it affects the ultimate width
    return {
        paddingLeft,
        left: birthPoint.toPercent(),
        width: `calc(${(deathPoint - birthPoint).toPercent()} - ${paddingLeft})`
    }
}