import React from "react";
import "../../styles/timeline/composerLifetime.css";

export default function ComposerLifetime(props) {
    const composer = props.composer;

    const birthPoint = props.range.inverseLerp(composer.lifetime.start);
    const deathPoint = props.range.inverseLerp(composer.lifetime.end);

    const style = {
        left: birthPoint.toPercent(),
        width: (deathPoint - birthPoint).toPercent()
    };

    return (
        <div className="composer-lifetime" style={style}>
            <p>{composer.name}</p>
            <p className="years">{composer.lifetime.start.year} — {composer.lifetime.end.year}</p>
        </div>
    );
}