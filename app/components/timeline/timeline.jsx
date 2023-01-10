import React from "react";
import "../../styles/timeline/timeline.css";
import "../../extensions/arrayExtensions.js"
import TimelineGrid from "./TimelineGrid.jsx";
import ComposerRow from "./ComposerRow.jsx";
import TimestampRange from "../../util/timestampRange.js";

export default function Timeline(props) {
    const range = new TimestampRange(new Date(1600, 0, 1), new Date(1800, 0, 1));

    const composersWithLifetime = props.composers.filter(c => c.lifetime.hasBothEnds()).orderBy(c => c.lifetime.start);
    const composersWithoutLifetime = props.composers.filter(c => !c.lifetime.hasBothEnds()).orderBy(c => c.name);
    const composers = [...composersWithLifetime, ...composersWithoutLifetime];

    return (
        <div className="xy-centerer">
            <div className="timeline relative">
                <TimelineGrid range={range} />
                <div className="zero-pos composers-scroller">
                    <div className="composers-container">
                        {composers.map(composer =>
                            <ComposerRow key={composer.name} composer={composer} range={range} displaySettings={props.displaySettings} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}