import rawComposers from "../data/resources/composers.csv";

import Timestamp from "../util/timestamp.js";
import TimestampRange from "../util/timestampRange.js";
import Composer from "./composer.js";

export default class Repository {
    static _composers = null;

    static getComposers() {
        return this._composers = this._composers ?? this._parseComposers(rawComposers);
    }

    static _parseComposers(rawComposers) {
        return rawComposers.map(c =>
            new Composer(
                c.name,
                new TimestampRange(c.birth, c.death),
                this._parsePublications(c.publications)
            )
        );
    }

    static _parsePublications(rawPublications) {
        if (rawPublications == null || rawPublications.trim() === "") {
            return [];
        }

        return rawPublications
            .split(',')
            .map(p => p.trim())
            .map(p => Timestamp.new(p));
    }
}