export class ChatUserListTemplate {
    constructor() {
        this.tag = 'ul';
        this.cssClass = 'list';
    }
    getTag() {
        return this.tag;
    }
    getCssClass() {
        return this.cssClass;
    }
    getContent() {
        return `
            {{#each this}}
                <li class="list__item">
                    <span class="list__text" data-id='{{id}}'>{{name}} {{secondName}}</span>
                </li>
            {{/each}}
        `;
    }
}
//# sourceMappingURL=chat-user-list.template.js.map