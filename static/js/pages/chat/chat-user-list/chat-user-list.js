import { BaseComponent } from "../../../core/base-component/base-component.js";
import { ChatUserListTemplate } from "./chat-user-list.template.js";
export class ChatUserListComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ChatUserListTemplate());
    }
    subscribeOnChildrens() {
        const items = this.getElement().querySelectorAll('.list__text');
        for (let item of items) {
            item.addEventListener('click', (e) => { this.selected(e.target); });
        }
    }
    selected(user) {
        const id = user.getAttribute('data-id');
        if (id) {
            this.getEventEmitter().emit('user-list-selected', id);
        }
    }
}
//# sourceMappingURL=chat-user-list.js.map