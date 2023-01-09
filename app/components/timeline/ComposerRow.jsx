import React from "react";
import "../../styles/timeline/composerRow.css";
import ComposerLifetime from "./ComposerLifetime.jsx";
import ComposerHelper from "../../composerHelper.js";
import ComposerGhost from "./ComposerGhost.jsx";

export default function ComposerRow(props) {
    const content = props.displaySettings.lifetimes && ComposerHelper.hasKnownLifetime(props.composer)
        ? <ComposerLifetime composer={props.composer} minDate={props.minDate} maxDate={props.maxDate} />
        : props.displaySettings.publications
            ? <ComposerGhost composer={props.composer} />
            : null;

    return (
        <div className="composer-row">
            {content}
        </div>
    )
}