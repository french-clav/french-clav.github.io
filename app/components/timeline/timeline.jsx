import React, { useRef } from "react"
import "../../styles/timeline/timeline.css"
import "../../extensions/arrayExtensions.js"
import TimelineGrid from "./TimelineGrid.jsx"
import ComposerRow from "./ComposerRow.jsx"
import TimestampRange from "../../util/timestampRange.js"
import { CSSTransition } from "react-transition-group"
import PeriodizationLayer from "./periodization/PeriodizationLayer.jsx"
import PeriodizationRowSpacer from "./periodization/PeriodizationRowSpacer.jsx"

export default function Timeline({ composerEnvelopes, displaySettings, openComposerModal, periodizations }) {
    const viewportRange = rangeToFitAll(composerEnvelopes)
    const orderedComposerEnvelopes = orderComposerEnvelopes(composerEnvelopes, displaySettings)

    const timelineRef = useRef()

    return (
        <CSSTransition nodeRef={timelineRef} in={composerEnvelopes.some(e => e.show)} timeout={250} classNames="timeline">
            <div ref={timelineRef} className="timeline relative">
                <TimelineGrid viewportRange={viewportRange} maxTicks={10} />
                <div className="zero-pos composers-scroller">
                    <div className="composers-container">
                        {periodizations.map(p =>
                            <PeriodizationRowSpacer key={p.name} show={p.active} />
                        )}
                        {composerEnvelopes.map(envelope =>
                            <ComposerRow
                                key={envelope.composer.name}
                                orderWithinContainer={composerEnvelopes.indexOf(envelope)}
                                desiredOrder={orderedComposerEnvelopes.filter(e => e.show).indexOf(envelope)}
                                composerEnvelope={envelope}
                                viewportRange={viewportRange}
                                displaySettings={displaySettings}
                                openComposerModal={openComposerModal}
                                activePeriodization={periodizations.find(p => p.active)}
                            />
                        )}
                    </div>
                </div>
                {periodizations.map(p =>
                    <PeriodizationLayer key={p.name} periodization={p} viewportRange={viewportRange} show={p.active} />
                )}
                <div className="zero-pos timeline-top-bottom-shadows" />
            </div>
        </CSSTransition>
    )
}

function rangeToFitAll(composerEnvelopes) {
    if (!composerEnvelopes.some(e => e.show)) {
        return new TimestampRange("1601", "1823")
    }

    const timestamps = composerEnvelopes
        .filter(e => e.show)
        .map(e => e.composer)
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

function orderComposerEnvelopes(composerEnvelopes, displaySettings) {
    if (displaySettings.lifetimes) {
        return [
            ...composerEnvelopes.filter(e => e.composer.hasKnownLifetime()).orderBy(e => e.composer.birth),
            ...composerEnvelopes.filter(e => !e.composer.hasKnownLifetime()).orderBy(e => e.composer.name)
        ]
    }

    if (displaySettings.publications) {
        return [
            ...composerEnvelopes.filter(e => e.composer.publications.length > 0).orderBy(e => e.composer.publications.min(p => p.timestamp)),
            ...composerEnvelopes.filter(e => e.composer.publications.length === 0).orderBy(e => e.composer.name)
        ]
    }

    return composerEnvelopes
}