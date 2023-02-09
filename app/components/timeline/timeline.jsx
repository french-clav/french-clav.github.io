import React, { useRef } from "react"
import "../../styles/timeline/timeline.css"
import "../../extensions/arrayExtensions.js"
import TimelineGrid from "./TimelineGrid.jsx"
import ComposerRow from "./ComposerRow.jsx"
import TimestampRange from "../../util/timestampRange.js"
import { CSSTransition } from "react-transition-group"
import PeriodizationLayer from "./periodization/PeriodizationLayer.jsx"
import PeriodizationRowSpacer from "./periodization/PeriodizationRowSpacer.jsx"
import GenerationRange from "./generations/GenerationRange.jsx"

export default function Timeline({
    composerEnvelopes,
    displaySettings,
    openComposerModal,
    periodizations,
    generations,
    show
}) {
    const viewportRange = new TimestampRange("1600", "1825")
    const orderedComposerEnvelopes = orderComposerEnvelopes(composerEnvelopes, displaySettings)

    const timelineRef = useRef()

    return (
        <CSSTransition nodeRef={timelineRef} in={show} timeout={250} classNames="timeline">
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
                        {generations.map(g =>
                            <GenerationRange
                                key={g.name}
                                generation={g}
                                orderedComposers={orderedComposerEnvelopes.filter(e => e.show).map(e => e.composer)}
                                show={displaySettings.generations}
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

function orderComposerEnvelopes(composerEnvelopes, displaySettings) {
    if (displaySettings.generations) {
        return orderComposerEnvelopesByBirthDate(composerEnvelopes)
    }

    if (displaySettings.publications) {
        return orderComposerEnvelopesByPublications(composerEnvelopes)
    }

    if (displaySettings.lifetimes) {
        return orderComposerEnvelopesByBirthDate(composerEnvelopes)
    }

    return composerEnvelopes
}

function orderComposerEnvelopesByPublications(composerEnvelopes) {
    return [
        ...composerEnvelopes.filter(e => e.composer.publications.length > 0).orderBy(e => e.composer.publications.min(p => p.timestamp)),
        ...composerEnvelopes.filter(e => e.composer.publications.length === 0).orderBy(e => e.composer.name)
    ]
}

function orderComposerEnvelopesByBirthDate(composerEnvelopes) {
    return [
        ...composerEnvelopes.filter(e => e.composer.hasKnownLifetime()).orderBy(e => e.composer.birth),
        ...composerEnvelopes.filter(e => !e.composer.hasKnownLifetime()).orderBy(e => e.composer.name)
    ]
}