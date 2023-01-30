import _ from "lodash"
import rawComposers from "../data/resources/composers.csv"
import rawHistoricalEpochs from "../data/resources/historicalEpochs.csv"
import rawSuiteTypeEpochs from "../data/resources/suiteTypeEpochs.csv"
import rawSuccessionEntries from "../data/resources/succession.csv"

import Timestamp from "../util/timestamp.js"
import Composer from "./composer.js"
import Publication from "./publication.js"
import Epoch from "./epoch.js"
import { SuccessionTreeBuilder } from "./successionTree.js"

export default class Repository {
    static composers = parseComposers(rawComposers)
    static historicalEpochs = parseEpochs(rawHistoricalEpochs)
    static suiteTypeEpochs = parseEpochs(rawSuiteTypeEpochs)
    static successionTree = parseSuccessionTree(rawSuccessionEntries, this.composers)
}

function parseComposers(rawComposers) {
    return rawComposers.map(c =>
        new Composer(
            c.id,
            c.name,
            !_.isEmpty(c.birth) ? new Timestamp(c.birth) : null,
            !_.isEmpty(c.death) ? new Timestamp(c.death) : null,
            parsePublications(c.publications),
            c.bio,
            c.photoFileName,
            c.hideFromList === "true"
        )
    )
}

function parsePublications(rawPublications) {
    if (_.isEmpty(rawPublications)) {
        return []
    }

    return rawPublications
        .split(",")
        .map(p => p.trim())
        .map(p => new Publication(p))
}

function parseEpochs(rawEpochs) {
    return rawEpochs.map(e =>
        new Epoch(
            e.start,
            e.end,
            e.name,
            e.color
        )
    )
}

function parseSuccessionTree(rawSuccessionEntries, composers) {
    const builder = new SuccessionTreeBuilder()

    for (const entry of rawSuccessionEntries) {
        const composer = composers.find(c => c.id === entry.composerId)
        const predecessor = composers.find(c => c.id === entry.predecessorId)

        builder.insert(composer, predecessor)
    }

    const tree = builder.build()
    return tree
}