import rawComposers from "../data/resources/composers.csv"
import rawPublications from "../data/resources/publications.csv"
import rawHistoricalEpochs from "../data/resources/historicalEpochs.csv"
import rawSuiteTypeEpochs from "../data/resources/suiteTypeEpochs.csv"
import rawSuccessionEntries from "../data/resources/succession.csv"
import rawSuccessionGroups from "../data/resources/successionGroups.csv"
import rawGenerations from "../data/resources/generations.csv"

import Timestamp from "../util/timestamp.js"
import Composer from "./composer.js"
import Publication from "./publication.js"
import Epoch from "./epoch.js"
import { SuccessionTreeBuilder } from "./successionTree.js"
import Generation from "./generation.js"

export default class Repository {
    static publications = parsePublications(rawPublications)
    static composers = parseComposers(rawComposers, this.publications)
    static historicalEpochs = parseEpochs(rawHistoricalEpochs)
    static suiteTypeEpochs = parseEpochs(rawSuiteTypeEpochs)
    static successionTree = parseSuccessionTree(rawSuccessionEntries, this.composers)
    static successionGroups = parseSuccessionGroups(rawSuccessionGroups, this.composers)
    static generations = parseGenerations(rawGenerations, this.composers)
}

function parseComposers(rawComposers, publications) {
    return rawComposers.map(c =>
        new Composer(
            parseInt(c.id),
            c.name,
            c.birth != "" ? new Timestamp(c.birth) : null,
            c.death != "" ? new Timestamp(c.death) : null,
            parseComposerPublications(c.publications, publications),
            c.bio,
            c.photoFileName,
            c.hideFromList === "true"
        )
    )
}

function parsePublications(rawPublications) {
    return rawPublications.map(p =>
        new Publication(
            parseInt(p.id),
            p.date,
            p.type,
            p.typeGenitive,
            p.name
        )
    )
}

function parseComposerPublications(rawPublicationIds, publications) {
    if (rawPublicationIds == null || rawPublicationIds == "") {
        return []
    }

    return rawPublicationIds
        .split(",")
        .map(x => parseInt(x.trim()))
        .map(id => publications.find(p => p.id == id))
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
        const composer = composers.find(c => c.id === parseInt(entry.composerId))
        const predecessor = composers.find(c => c.id === parseInt(entry.predecessorId))

        builder.insert(composer, predecessor)
    }

    const tree = builder.build()
    return tree
}

function parseSuccessionGroups(rawSuccessionGroups, composers) {
    return rawSuccessionGroups.map(g => ({
        name: g.name,
        composers: composers.filter(c => g.composerIds
            .split(",")
            .map(i => parseInt(i.trim()))
            .includes(c.id)
        )
    }))
}

function parseGenerations(rawGenerations, composers) {
    return rawGenerations.map(g =>
        new Generation(
            composers.filter(c => parseInt(g.firstComposerId) <= c.id && c.id <= parseInt(g.lastComposerId)),
            g.name,
            g.color,
            g.weak === "true"
        )
    )
}