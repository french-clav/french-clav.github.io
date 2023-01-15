import React from "react";
import "../../styles/timeline/timeline.css";
import "../../extensions/arrayExtensions.js"
import TimelineGrid from "./TimelineGrid.jsx";
import ComposerRow from "./ComposerRow.jsx";
import TimestampRange from "../../util/timestampRange.js";

export default function Timeline(props) {
    const range = rangeToFitAll(props.composers);

    const composersWithLifetime = props.composers.filter(c => c.hasKnownLifetime()).orderBy(c => c.birth);
    const composersWithoutLifetime = props.composers.filter(c => !c.hasKnownLifetime()).orderBy(c => c.name);
    const composers = [...composersWithLifetime, ...composersWithoutLifetime];

    return (
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
    );
}

function rangeToFitAll(composers) {
    const timestamps = composers
        .flatMap(c => [
            c.birth,
            c.death,
            ...c.publications.flatMap(p => [
                p.minTimestamp,
                p.maxTimestamp
            ])
        ])
        .filter(x => x != null)
        .orderBy(x => x);

    return new TimestampRange(timestamps[0].addYears(-1), timestamps[timestamps.length - 1].addYears(1));
}