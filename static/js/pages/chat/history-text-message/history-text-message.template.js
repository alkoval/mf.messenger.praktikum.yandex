export class HistoryTextMessageTemplate {
    constructor() {
        this.tag = 'div';
        this.cssClass = 'history__message history__message_type_text';
    }
    getTag() {
        return this.tag;
    }
    getCssClass() {
        return this.cssClass;
    }
    getContent() {
        return `
                <div>
                    {{#if isLeft}}<span class="history__user-name">{{userName}}</span>{{/if}}
                    <p>{{message}}</p>
                </div>
                <div class="history__time">
                    <time>{{shortTime}}</time>
                </div>
        `;
    }
}
//# sourceMappingURL=history-text-message.template.js.map