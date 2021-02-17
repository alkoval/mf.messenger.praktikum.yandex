import { BaseComponent } from '../../../core/base-component/base-component'
import { Templator } from '../../../core/core'
import { OnInit, PropsComponent } from '../../../shared/shared.interfaces'
import { ChatDialog } from '../../../shared/shared.models'
import { ChatService, CHAT_EVENTS } from '../../services/chat.service'
import { ChatHistoryTemplate } from './chat-history.template'

export class ChatHistoryComponent extends BaseComponent implements OnInit {
    private chatService: ChatService;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ChatHistoryTemplate());
        this.chatService = ChatService.getInstance();
        this.onInit();
    }

    public onInit(): void {
        this.chatService.subscribe().on(CHAT_EVENTS.DIALOG_SELECTED, this.selected.bind(this));
    }

    public subscribe(): void {
        const md = this.getElement().querySelectorAll('.history__button')[0];
        if (md) {
            md.addEventListener('click', () => { this.toggleModalDialog() });
        }

        const md2 = this.getElement().querySelectorAll('.history__button')[1];
        if (md2) {
            md2.addEventListener('click', () => { this.toggleModalClip() });
        }

        const mdAddUser = this.getElement().querySelectorAll('.modal_position-right-top .list__item')[0];
        if (mdAddUser) {
            mdAddUser.addEventListener('click', () => { this.showMdAddUser() });
        }

        const mdDelUser = this.getElement().querySelectorAll('.modal_position-right-top .list__item')[1];
        if (mdDelUser) {
            mdDelUser.addEventListener('click', () => { this.showMdDelUser() });
        }

        const delSelected = this.getElement().querySelectorAll('.modal_position-right-top .list__item')[2];
        if (delSelected) {
            delSelected.addEventListener('click', () => { this.deleteSelected() });
        }
    }

    public toggleModalDialog(): void {
        const md = this.getElement().getElementsByClassName('modal modal_position-right-top')[0];
        if (md.classList.contains("modal_state_show")) {
            md.classList.remove("modal_state_show");
        } else {
            md.classList.add("modal_state_show");
        }
    }

    public toggleModalClip(): void {
        const md = this.getElement().getElementsByClassName('modal modal_position_left-end')[0] as HTMLElement;
        const btn = this.getElement().getElementsByClassName('history__button history__button_type_text')[0] as HTMLElement;
        md.style.top = btn.offsetTop.toString();
        md.style.left = btn.offsetLeft.toString();
        if (md.classList.contains("modal_state_show")) {
            md.classList.remove("modal_state_show");
        } else {
            md.classList.add("modal_state_show");
        }
    }

    public selected(dialog: ChatDialog | null): void {
        this.setProps({ 'root': dialog });
    }

    public showMdAddUser(): void {
        this.toggleModalDialog()
        this.getProps().mdAddUser.toggle();
    }

    public showMdDelUser(): void {
        this.toggleModalDialog()
        this.getProps().mdDelUser.toggle();
    }

    // Переписать метод на использование сервиса истории диалога
    public drawHistory(): void {

    }

    public deleteSelected(): void {
        this.toggleModalDialog();
        const dialog = this.chatService.getSelectedDialog();
        if (dialog !== null) {
            this.chatService.deleteDialog(dialog.id);
        }
    }
}