import React from "react";
import "../../styles/timeline/composerRow.css";
import ComposerLifetime from "./ComposerLifetime.jsx";
import ComposerGhost from "./ComposerGhost.jsx";
import PublicationMarker from "./PublicationMarker.jsx";

export default function ComposerRow(props) {
    const content = props.displaySettings.lifetimes && props.composer.hasKnownLifetime()
        ? <ComposerLifetime composer={props.composer} range={props.range} />
        : props.displaySettings.publications
            ? <ComposerGhost composer={props.composer} />
            : null;

    return (
        <div className="composer-row">
            {content}
            {props.displaySettings.publications && props.composer.publications.map(p =>
                <PublicationMarker key={p.timestamp} publication={p} range={props.range} />
            )}
        </div>
    )
}