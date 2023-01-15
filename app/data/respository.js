import rawComposers from "../data/resources/composers.csv";

import Timestamp from "../util/timestamp.js";
import Composer from "./composer.js";
import Publication from "./publication.js";

export default class Repository {
    static _composers = null;

    static getComposers() {
        return this._composers = this._composers ?? this._parseComposers(rawComposers);
    }

    static _parseComposers(rawComposers) {
        return rawComposers.map(c =>
            new Composer(
                c.name,
                !isEmpty(c.birth) ? new Timestamp(c.birth) : null,
                !isEmpty(c.death) ? new Timestamp(c.death) : null,
                this._parsePublications(c.publications)
            )
        );

        function isEmpty(value) { return value == null || value === ""; }
    }

    static _parsePublications(rawPublications) {
        if (rawPublications == null || rawPublications.trim() === "") {
            return [];
        }

        return rawPublications
            .split(",")
            .map(p => p.trim())
            .map(p => new Publication(p));
    }
}