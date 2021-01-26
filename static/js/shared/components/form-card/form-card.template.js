export class FormCardTemplate {
    constructor() {
        this.tag = 'from';
        this.cssClass = 'card';
    }
    getTag() {
        return this.tag;
    }
    getCssClass() {
        return this.cssClass;
    }
    getContent() {
        return `
            <div class="card__header">
                <div class="card__title">{{title}}</div>
            </div>
            <div class="card__body"></div>
            <div class="card__footer"></div>
        `;
    }
}
//# sourceMappingURL=form-card.template.js.map