import React from "react";
import "../../styles/timeline/composerLifetime.css";
import TimelineMath from "../../timelineMath.js";

export default function ComposerLifetime(props) {
    const composer = props.composer;

    const birthPoint = TimelineMath.calcOffset(composer.birthDate ?? composer.birthYear, props.minDate, props.maxDate);
    const deathPoint = TimelineMath.calcOffset(composer.deathDate ?? composer.deathYear, props.minDate, props.maxDate);

    const style = {
        left: birthPoint.toPercent(),
        width: (deathPoint - birthPoint).toPercent()
    };

    return (
        <div className="composer-lifetime" style={style}>
            <p>{composer.name}</p>
            <p className="years">{composer.birthYear} - {composer.deathYear}</p>
        </div>
    );
}