export class TextLinkTemplate {
    constructor() {
        this.tag = 'a';
        this.cssClass = 'text-link';
    }
    getTag() {
        return this.tag;
    }
    getCssClass() {
        return this.cssClass;
    }
    getContent() {
        return `
            {{text}}
        `;
    }
}
//# sourceMappingURL=text-link.template.js.map