import { BaseComponent } from '../../../core/base-component/base-component.js';
import { ChatService, CHAT_EVENTS } from '../../services/chat.service.js';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.js';
import { ChatDialogListTemplate } from './chat-dialog-list.template.js';
export class ChatDialogListComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ChatDialogListTemplate());
        this.chatService = ChatService.getInstance();
        this.onInit();
    }
    onInit() {
        this.chatService.subscribe().on(CHAT_EVENTS.DIALOGS_RELOAD, this.reloadDialogs.bind(this));
        this.chatService.subscribe().on(CHAT_EVENTS.DIALOG_FILTERED, this.reloadDialogs.bind(this));
        this.chatService.subscribe().on(CHAT_EVENTS.DIALOG_SELECTED, this.selected.bind(this));
    }
    prerenderChildrens() {
        this.getElement().innerHTML = '';
        const dialogs = [];
        if (this.getProps().dialogs) {
            for (let item of this.getProps().dialogs) {
                dialogs.push(new ChatDialogComponent({ 'root': item }, this.templator));
            }
        }
        this.renderToRoot(dialogs);
        this.afterRenderChildrens();
    }
    reloadDialogs(dialogs) {
        this.setProps({ 'dialogs': dialogs });
    }
    selected(dialog) {
        const prev = this.getElement().querySelector('.chat__dialog_type_selected');
        if (prev) {
            prev.classList.remove('chat__dialog_type_selected');
        }
        const dialogs = document.querySelectorAll('[data-id-dialog]');
        for (let item of dialogs) {
            const id = item.getAttribute('data-id-dialog');
            if (id !== null) {
                if (parseInt(id) === (dialog === null || dialog === void 0 ? void 0 : dialog.id)) {
                    item.classList.add('chat__dialog_type_selected');
                    break;
                }
            }
        }
    }
}
//# sourceMappingURL=chat-dialog-list.js.map