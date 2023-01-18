import React, { useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "../../extensions/numberExtensions.js"
import "../../styles/timeline/publicationMarker.css"

export default function PublicationMarker(props) {
    const { publication } = props

    const style = {
        left: props.range.inverseLerp(publication.timestamp).toPercent()
    }

    const markerRef = useRef()

    return (
        <CSSTransition nodeRef={markerRef} in={props.show} timeout={250} classNames="publication-marker">
            <>
                <div ref={markerRef} className="publication-marker" style={style} />
                <div className="publication-marker-tooltip prevent-select" style={style}>
                    <div className="publication-marker-tooltip-title">Издание нот</div>
                    <div className="publication-marker-tooltip-timestamp">{publication.timestamp.toString()}</div>
                </div>
            </>
        </CSSTransition>
    )
}