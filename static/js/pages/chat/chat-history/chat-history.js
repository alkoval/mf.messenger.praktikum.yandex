import { BaseComponent } from '../../../core/base-component/base-component.js';
import { ChatService, CHAT_EVENTS } from '../../services/chat.service.js';
import { ChatHistoryTemplate } from './chat-history.template.js';
export class ChatHistoryComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ChatHistoryTemplate());
        this.chatService = ChatService.getInstance();
        this.onInit();
    }
    onInit() {
        this.chatService.subscribe().on(CHAT_EVENTS.DIALOG_SELECTED, this.selected.bind(this));
    }
    subscribe() {
        const md = this.getElement().querySelectorAll('.history__button')[0];
        if (md) {
            md.addEventListener('click', () => { this.toggleModalDialog(); });
        }
        const md2 = this.getElement().querySelectorAll('.history__button')[1];
        if (md2) {
            md2.addEventListener('click', () => { this.toggleModalClip(); });
        }
        const mdAddUser = this.getElement().querySelectorAll('.modal_position-right-top .list__item')[0];
        if (mdAddUser) {
            mdAddUser.addEventListener('click', () => { this.showMdAddUser(); });
        }
        const mdDelUser = this.getElement().querySelectorAll('.modal_position-right-top .list__item')[1];
        if (mdDelUser) {
            mdDelUser.addEventListener('click', () => { this.showMdDelUser(); });
        }
        const delSelected = this.getElement().querySelectorAll('.modal_position-right-top .list__item')[2];
        if (delSelected) {
            delSelected.addEventListener('click', () => { this.deleteSelected(); });
        }
    }
    toggleModalDialog() {
        const md = this.getElement().getElementsByClassName('modal modal_position-right-top')[0];
        if (md.classList.contains("modal_state_show")) {
            md.classList.remove("modal_state_show");
        }
        else {
            md.classList.add("modal_state_show");
        }
    }
    toggleModalClip() {
        const md = this.getElement().getElementsByClassName('modal modal_position_left-end')[0];
        const btn = this.getElement().getElementsByClassName('history__button history__button_type_text')[0];
        md.style.top = btn.offsetTop.toString();
        md.style.left = btn.offsetLeft.toString();
        if (md.classList.contains("modal_state_show")) {
            md.classList.remove("modal_state_show");
        }
        else {
            md.classList.add("modal_state_show");
        }
    }
    selected(dialog) {
        this.setProps({ 'root': dialog });
    }
    showMdAddUser() {
        this.getProps().mdAddUser.toggle();
    }
    showMdDelUser() {
        this.getProps().mdDelUser.toggle();
    }
    drawHistory() {
    }
    deleteSelected() {
        this.toggleModalDialog();
        const dialog = this.chatService.getSelectedDialog();
        if (dialog !== null) {
            this.chatService.deleteDialog(dialog.id);
        }
    }
}
//# sourceMappingURL=chat-history.js.map