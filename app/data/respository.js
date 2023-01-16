import rawComposers from "../data/resources/composers.csv";

import Timestamp from "../util/timestamp.js";
import Composer from "./composer.js";
import Publication from "./publication.js";

export default class Repository {
    static composers = parseComposers(rawComposers);
}

function parseComposers(rawComposers) {
    return rawComposers.map(c =>
        new Composer(
            c.name,
            !isEmpty(c.birth) ? new Timestamp(c.birth) : null,
            !isEmpty(c.death) ? new Timestamp(c.death) : null,
            parsePublications(c.publications)
        )
    );
}

function parsePublications(rawPublications) {
    if (isEmpty(rawPublications)) {
        return [];
    }

    return rawPublications
        .split(",")
        .map(p => p.trim())
        .map(p => new Publication(p));
}

function isEmpty(value) {
    return value == null || value.trim() === "";
}