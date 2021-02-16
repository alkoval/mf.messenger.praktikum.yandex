export class ChatNoSelectedTemplate {
    constructor() {
        this.tag = 'div';
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
            <span>Выберите чат чтобы отправить сообщение</span>
        `;
    }
}
//# sourceMappingURL=chat-no-selected.template.js.map