import rawComposers from "../data/resources/composers.csv"
import rawHistoricalEpochs from "../data/resources/historicalEpochs.csv"

import Timestamp from "../util/timestamp.js"
import Composer from "./composer.js"
import Publication from "./publication.js"
import _ from "lodash"
import HistoricalEpoch from "./historicalEpoch.js"

export default class Repository {
    static composers = parseComposers(rawComposers)
    static historicalEpochs = parseHistoricalEpochs(rawHistoricalEpochs)
}

function parseComposers(rawComposers) {
    return rawComposers.map(c =>
        new Composer(
            c.name,
            !_.isEmpty(c.birth) ? new Timestamp(c.birth) : null,
            !_.isEmpty(c.death) ? new Timestamp(c.death) : null,
            parsePublications(c.publications),
            c.bio,
            c.photoFileName
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

function parseHistoricalEpochs(rawHistoricalEpochs) {
    return rawHistoricalEpochs.map(e => new HistoricalEpoch(e.start, e.end, e.name, e.color))
}