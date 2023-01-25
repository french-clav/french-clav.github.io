import React, { useRef } from "react"
import "../../styles/timeline/timeline.css"
import "../../extensions/arrayExtensions.js"
import TimelineGrid from "./TimelineGrid.jsx"
import ComposerRow from "./ComposerRow.jsx"
import TimestampRange from "../../util/timestampRange.js"
import { CSSTransition } from "react-transition-group"
import HistoricalContextRow from "./historicalContext/HistoricalContextRow.jsx"
import HistoricalContextRowSpacer from "./historicalContext/HistoricalContextRowSpacer.jsx"

export default function Timeline({ composerCards, displaySettings, openComposerModal, historicalEpochs }) {
    const viewportRange = rangeToFitAll(composerCards)
    const orderedComposerCards = orderComposerCards(composerCards, displaySettings)

    const timelineRef = useRef()

    return (
        <CSSTransition nodeRef={timelineRef} in={composerCards.some(c => c.show)} timeout={250} classNames="timeline">
            <div ref={timelineRef} className="timeline relative">
                <TimelineGrid viewportRange={viewportRange} maxTicks={10} />
                <div className="zero-pos composers-scroller">
                    <div className="composers-container">
                        <HistoricalContextRowSpacer show={displaySettings.historicalContext} />
                        {composerCards.map(card =>
                            <ComposerRow
                                key={card.composer.name}
                                orderWithinContainer={composerCards.filter(c => c.show).indexOf(card)}
                                desiredOrder={orderedComposerCards.indexOf(card)}
                                composerCard={card}
                                viewportRange={viewportRange}
                                displaySettings={displaySettings}
                                openComposerModal={openComposerModal}
                                historicalEpochs={historicalEpochs}
                            />
                        )}
                    </div>
                </div>
                <HistoricalContextRow epochs={historicalEpochs} viewportRange={viewportRange} show={displaySettings.historicalContext} />
                <div className="zero-pos timeline-top-bottom-shadows" />
            </div>
        </CSSTransition>
    )
}

function rangeToFitAll(composerCards) {
    if (!composerCards.some(c => c.show)) {
        return new TimestampRange("1601", "1823")
    }

    const timestamps = composerCards
        .filter(c => c.show)
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

function orderComposerCards(composerCards, displaySettings) {
    if (displaySettings.lifetimes) {
        return [
            ...composerCards.filter(c => c.composer.hasKnownLifetime()).orderBy(c => c.composer.birth),
            ...composerCards.filter(c => !c.composer.hasKnownLifetime()).orderBy(c => c.composer.name)
        ]
    }

    if (displaySettings.publications) {
        return [
            ...composerCards.filter(c => c.composer.publications.length > 0).orderBy(c => c.composer.publications.min(p => p.timestamp)),
            ...composerCards.filter(c => c.composer.publications.length === 0).orderBy(c => c.composer.name)
        ]
    }

    return composerCards
}