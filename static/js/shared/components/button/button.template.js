export class ButtonTemplate {
    constructor() {
        this.tag = 'button';
        this.cssClass = 'card__button';
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
//# sourceMappingURL=button.template.js.map