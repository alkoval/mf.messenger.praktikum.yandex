export class ChatDialogTemplate {
    constructor() {
        this.tag = 'div';
        this.cssClass = 'chat__dialog';
    }
    getTag() {
        return this.tag;
    }
    getCssClass() {
        return this.cssClass;
    }
    getContent() {
        return `
            <div class="chat__avatar-column">
                <img class="chat__avatar" src="{{avatar}}">
            </div>
            <div class="chat__text-column">
                <span class="chat__title">{{title}}</span>
                <span class="chat__message-preview">{{message}}</span>
            </div>
            <div class="chat__property-column">
                <time class="chat__time">{{shortTime}}</time>
                {{#if unread}}
                    <span class="chat__count-unread">{{unread}}</span>
                {{/if}}                
            </div>
        `;
    }
}
//# sourceMappingURL=chat-dialog.template.js.map