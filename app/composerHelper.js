export default class ComposerHelper {
    static hasKnownLifetime(composer) {
        return !!composer.birthYear && !!composer.deathYear;
    }
}