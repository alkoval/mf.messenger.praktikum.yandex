export class FormFieldTemplate {
    constructor() {
        this.tag = 'div';
        this.cssClass = 'form-field';
    }
    getTag() {
        return this.tag;
    }
    getCssClass() {
        return this.cssClass;
    }
    getContent() {
        return `
            <input class="form-field__input" type="{{type}}" name="{{name}}" required>
            <label class="form-field__label" for="{{name}}"> {{label}} </label>
            <span class="form-field__error">{{error}}</span>
        `;
    }
}
//# sourceMappingURL=form-field.template.js.map