import React from "react";
import "../../styles/timeline/composerGhost.css";

export default function ComposerGhost(props) {
    return (
        <div className="composer-ghost relative">
            <p>{props.composer.name}</p>
        </div>
    );
}