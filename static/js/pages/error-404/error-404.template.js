export class Error404PageTemplate {
    constructor() {
        this.tag = 'ul';
        this.cssClass = 'intro';
    }
    getTag() {
        return this.tag;
    }
    getCssClass() {
        return this.cssClass;
    }
    getContent() {
        return `
            <span>Андрюха, у нас 404! Возможно криминал! По коням!</span>
        `;
    }
}
//# sourceMappingURL=error-404.template.js.map