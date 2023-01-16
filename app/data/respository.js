import rawComposers from "../data/resources/composers.csv";

import Timestamp from "../util/timestamp.js";
import Composer from "./composer.js";
import Publication from "./publication.js";
import _ from "lodash";

export default class Repository {
    static composers = parseComposers(rawComposers);
}

function parseComposers(rawComposers) {
    return rawComposers.map(c =>
        new Composer(
            c.name,
            !_.isEmpty(c.birth) ? new Timestamp(c.birth) : null,
            !_.isEmpty(c.death) ? new Timestamp(c.death) : null,
            parsePublications(c.publications)
        )
    );
}

function parsePublications(rawPublications) {
    if (_.isEmpty(rawPublications)) {
        return [];
    }

    return rawPublications
        .split(",")
        .map(p => p.trim())
        .map(p => new Publication(p));
}