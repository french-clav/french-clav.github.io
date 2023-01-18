import React, { useRef } from "react"
import "../../styles/timeline/timeline.css"
import "../../extensions/arrayExtensions.js"
import TimelineGrid from "./TimelineGrid.jsx"
import ComposerRow from "./ComposerRow.jsx"
import TimestampRange from "../../util/timestampRange.js"
import { CSSTransition } from "react-transition-group"

export default function Timeline(props) {
    const range = rangeToFitAll(props.composerCards)

    const cardsWithLifetime = props.composerCards.filter(c => c.composer.hasKnownLifetime()).orderBy(c => c.composer.birth)
    const cardsWithoutLifetime = props.composerCards.filter(c => !c.composer.hasKnownLifetime()).orderBy(c => c.composer.name)
    const composerCards = [...cardsWithLifetime, ...cardsWithoutLifetime]

    const timelineRef = useRef()

    return (
        <CSSTransition nodeRef={timelineRef} in={composerCards.some(c => c.displayed)} timeout={250} classNames="timeline">
            <div ref={timelineRef} className="timeline relative">
                <TimelineGrid range={range} />
                <div className="zero-pos composers-scroller">
                    <div className="composers-container">
                        {composerCards.map(card =>
                            <ComposerRow key={card.composer.name} composerCard={card} range={range} displaySettings={props.displaySettings} />
                        )}
                    </div>
                </div>
                <div className="timeline-top-bottom-shadows" />
            </div>
        </CSSTransition>
    )
}

function rangeToFitAll(composerCards) {
    if (!composerCards.some(c => c.displayed)) {
        return new TimestampRange("1601", "1823")
    }

    const timestamps = composerCards
        .filter(c => c.displayed)
        .map(c => c.composer)
        .flatMap(c => [
            c.birth,
            c.death,
            ...c.publications.flatMap(p => [
                p.minTimestamp,
                p.maxTimestamp
            ])
        ])
        .filter(x => x != null)
        .orderBy(x => x)

    return new TimestampRange(timestamps[0].addYears(-1), timestamps[timestamps.length - 1].addYears(1))
}