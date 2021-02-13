export class NotifyTemplate {
    constructor() {
        this.tag = 'div';
        this.cssClass = 'notify';
    }
    getTag() {
        return this.tag;
    }
    getCssClass() {
        return this.cssClass;
    }
    getContent() {
        return `
            {{message}}
        `;
    }
}
//# sourceMappingURL=notify.template.js.map