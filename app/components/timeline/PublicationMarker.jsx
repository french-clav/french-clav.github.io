import React from "react";
import "../../extensions/numberExtensions.js";
import "../../styles/timeline/publicationMarker.css";

export default function PublicationMarker(props) {
    const { publication } = props;

    const style = {
        left: props.range.inverseLerp(publication.timestamp).toPercent()
    };

    return (
        <>
            <div className="publication-marker" style={style} />
            <div className="publication-marker-tooltip" style={style}>
                <div className="publication-marker-tooltip-title">Издание нот</div>
                <div className="publication-marker-tooltip-timestamp">{publication.timestamp.toString()}</div>
            </div>
        </>
    );
}