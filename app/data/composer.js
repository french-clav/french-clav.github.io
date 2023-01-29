import _ from "lodash"

export default class Composer {
    constructor(id, name, birth, death, publications, bio, photoFileName, hideFromList) {
        this.id = id
        this.name = name
        this.birth = birth
        this.death = death
        this.publications = publications
        this.bio = bio
        this.photoFileName = photoFileName
        this.hideFromList = hideFromList
    }

    hasKnownLifetime() {
        return this.birth != null && this.death != null
    }

    hasPhoto() {
        return !_.isEmpty(this.photoFileName)
    }
}