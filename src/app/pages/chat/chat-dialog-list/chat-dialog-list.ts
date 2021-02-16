import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { PropsComponent } from '../../../shared/interfaces/props-component.js';
import { OnInit } from '../../../shared/shared.interfaces.js';
import { ChatDialog } from '../../../shared/shared.models.js';
import { ChatService, CHAT_EVENTS } from '../../services/chat.service.js';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.js';
import { ChatDialogListTemplate } from './chat-dialog-list.template.js';

export class ChatDialogListComponent extends BaseComponent implements OnInit {
    private chatService: ChatService;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ChatDialogListTemplate());
        this.chatService = ChatService.getInstance();
        this.onInit();
    }

    public onInit(): void {
        this.chatService.subscribe().on(CHAT_EVENTS.DIALOGS_RELOAD, this.reloadDialogs.bind(this));
        this.chatService.subscribe().on(CHAT_EVENTS.DIALOG_FILTERED, this.reloadDialogs.bind(this));
        this.chatService.subscribe().on(CHAT_EVENTS.DIALOG_SELECTED, this.selected.bind(this));
    }

    public prerenderChildrens(): void {
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

    public reloadDialogs(dialogs: ChatDialog[]): void {
        this.setProps({ 'dialogs': dialogs });
    }

    public selected(dialog: ChatDialog | null): void {
        const prev = this.getElement().querySelector('.chat__dialog_type_selected');
        if (prev) {
            prev.classList.remove('chat__dialog_type_selected');
        }
        const dialogs = document.querySelectorAll('[data-id-dialog]');
        for (let item of dialogs) {
            const id = item.getAttribute('data-id-dialog')
            if (id !== null) {
                if (parseInt(id) === dialog?.id) {
                    item.classList.add('chat__dialog_type_selected');
                    break;
                }
            }
        }
    }
}