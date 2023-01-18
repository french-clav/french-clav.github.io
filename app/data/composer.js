import _ from "lodash"

export default class Composer {
    constructor(name, birth, death, publications, bio, photoFileName) {
        this.name = name
        this.birth = birth
        this.death = death
        this.publications = publications
        this.bio = bio
        this.photoFileName = photoFileName
    }

    hasKnownLifetime() {
        return this.birth != null && this.death != null
    }

    hasPhoto() {
        return !_.isEmpty(this.photoFileName)
    }
}