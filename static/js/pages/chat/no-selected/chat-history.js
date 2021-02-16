import { BaseComponent } from '../../../core/base-component/base-component.js';
import { MockupData } from '../../../core/mockup/mockup-data.js';
import { ChatService } from '../../services/chat.service.js';
import { ChatHistoryTemplate } from '../chat-history/chat-history.template.js';
import { HistoryImgMessageComponent } from '../history-img-message/history-img-message.js';
import { HistoryTextMessageComponent } from '../history-text-message/history-text-message.js';
export class ChatHistoryComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ChatHistoryTemplate());
        this.chatService = ChatService.getInstance();
    }
    onInit() {
    }
    prerenderChildrens() {
        this.childrens = [];
        const length = Math.floor(Math.random() * Math.floor(MockupData.getInstance().historyMessages.length - 1));
        const data = MockupData.getInstance().historyMessages.slice(0, length);
        for (let item of data) {
            if (item.type === 'text') {
                this.childrens.push(new HistoryTextMessageComponent({ "root": item }, this.templator));
            }
            if (item.type === 'img') {
                this.childrens.push(new HistoryImgMessageComponent({ "root": item }, this.templator));
            }
        }
        this.renderChildrensToSelector('.history__board');
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
        const delDialogLink = this.getElement().querySelectorAll('.modal_position-right-top .list__item')[2];
        if (delDialogLink) {
            delDialogLink.addEventListener('click', () => { this.deleteDialog(); });
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
    drawHistory() {
    }
    deleteDialog() {
        this.toggleModalDialog();
        const dialog = this.chatService.getSelectedDialog();
        console.log(dialog);
        if (dialog !== null) {
            this.chatService.deleteDialog(dialog.id);
        }
    }
}
//# sourceMappingURL=chat-history.js.map