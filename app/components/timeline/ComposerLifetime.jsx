import React from "react";
import "../../styles/timeline/composerLifetime.css";

export default function ComposerLifetime(props) {
    const composer = props.composer;

    const birthPoint = props.range.inverseLerp(composer.birth);
    const deathPoint = props.range.inverseLerp(composer.death);

    const style = {
        left: birthPoint.toPercent(),
        right: (1 - deathPoint).toPercent()
    };

    return (
        <div className="composer-lifetime" style={style}>
            <p>{composer.name}</p>
            <p className="years">{composer.birth.year} — {composer.death.year}</p>
        </div>
    );
}