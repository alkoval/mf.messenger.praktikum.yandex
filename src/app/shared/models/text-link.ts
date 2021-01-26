export class TextLink {
    text: string;
    cssClass: string;
    url: string;

    constructor(text: string, cssClass: string, url: string) {
        this.text = text;
        this.cssClass = cssClass;
        this.url = url;
    }
}