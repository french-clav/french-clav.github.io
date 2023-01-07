import React from "react";
import "../../styles/timeline/timeline.css";
import Composer from "./composer.jsx";
import TimelineGrid from "./grid.jsx";
import "../../extensions/arrayExtensions.js"

export default function Timeline(props) {
    const minDate = new Date(1600, 0, 1);
    const maxDate = new Date(1800, 0, 1);

    const composers = props.composers.orderBy(c => c.birthYear);
    return (
        <div className="xy-centerer">
            <div className="timeline relative">
                <TimelineGrid minDate={minDate} maxDate={maxDate} />
                <div className="zero-pos composers-scroller">
                    <div className="composers-container">
                        {composers.map(composer => 
                            <Composer key={composer.name} composer={composer} minDate={minDate} maxDate={maxDate}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}