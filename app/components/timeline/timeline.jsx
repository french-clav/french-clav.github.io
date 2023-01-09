import React from "react";
import "../../styles/timeline/timeline.css";
import "../../extensions/arrayExtensions.js"
import TimelineGrid from "./Grid.jsx";
import ComposerHelper from "../../composerHelper.js";
import ComposerRow from "./ComposerRow.jsx";

export default function Timeline(props) {
    const minDate = new Date(1600, 0, 1);
    const maxDate = new Date(1800, 0, 1);

    const composersWithLifetime = props.composers.filter(ComposerHelper.hasKnownLifetime).orderBy(c => c.birthYear);
    const composersWithoutLifetime = props.composers.filter(c => !ComposerHelper.hasKnownLifetime(c)).orderBy(c => c.name);
    const composers = [...composersWithLifetime, ...composersWithoutLifetime];

    return (
        <div className="xy-centerer">
            <div className="timeline relative">
                <TimelineGrid minDate={minDate} maxDate={maxDate} />
                <div className="zero-pos composers-scroller">
                    <div className="composers-container">
                        {composers.map(composer =>
                            <ComposerRow key={composer.name} composer={composer} minDate={minDate} maxDate={maxDate} displaySettings={props.displaySettings} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}