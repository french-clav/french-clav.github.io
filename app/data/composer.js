import TimestampRange from "../util/timestampRange.js"

export default class Composer {
    constructor(id, name, birth, death, publications, bio, photoFileName, hideFromList, tooltip) {
        this.id = id
        this.name = name
        this.birth = birth
        this.death = death
        this.publications = publications
        this.bio = bio
        this.photoFileName = photoFileName
        this.hideFromList = hideFromList
        this.tooltip = tooltip
    }

    get lifetime() {
        return new TimestampRange(this.birth, this.death)
    }

    hasKnownLifetime() {
        return this.birth != null && this.death != null
    }

    hasPhoto() {
        return this.photoFileName != null && this.photoFileName !== ""
    }
}