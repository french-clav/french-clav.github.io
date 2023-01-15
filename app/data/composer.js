export default class Composer {
    constructor(name, birth, death, publications) {
        this.name = name;
        this.birth = birth;
        this.death = death;
        this.publications = publications;
    }

    hasKnownLifetime() {
        return this.birth != null && this.death != null;
    }
}