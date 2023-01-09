import React from "react";
import "../../styles/timeline/composer.css";
import TimelineMath from "../../timelineMath";
import "../../extensions/numberExtensions";

export default function Composer(props) {
    const composer = props.composer;
    
    const birthPoint = TimelineMath.calcOffset(composer.birthDate ?? composer.birthYear, props.minDate, props.maxDate);
    const deathPoint = TimelineMath.calcOffset(composer.deathDate ?? composer.deathYear, props.minDate, props.maxDate);

    const style = {
        left: birthPoint.toPercent(),
        width: (deathPoint - birthPoint).toPercent()
    };

    return (
        <div className="composer-row">
            <div className="composer-lifetime" style={style}>
                <p>{props.composer.name}</p>
                <p className="years">{composer.birthYear} - {composer.deathYear}</p>
            </div>
        </div>
    )
}