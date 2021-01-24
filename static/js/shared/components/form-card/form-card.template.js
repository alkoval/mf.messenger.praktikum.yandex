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
            <div class="card__footer">
                <button class="card__button card__button_bg_dark-green" type="button">{{btnText}}</button>
                <a class="card__link" href="{{link}}">{{linkText}}</a>
            </div>
        `;
    }
}
//# sourceMappingURL=form-card.template.js.map