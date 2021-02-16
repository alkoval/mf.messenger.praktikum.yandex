import { BaseComponent } from '../../../core/base-component/base-component.js';
import { ChatService } from '../../services/chat.service.js';
import { ChatUserListComponent } from '../chat-user-list/chat-user-list.js';
import { ModalDelUserTemplate } from './modal-del-user.template.js';
export class ModalDelUserComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ModalDelUserTemplate());
        this.chatService = ChatService.getInstance();
        this.onInit();
    }
    onInit() {
        const userListComponent = new ChatUserListComponent({ 'root': [], 'md': this }, this.templator);
        userListComponent.getEventEmitter().on('user-list-selected', this.markUser.bind(this));
        this.setProps({ 'userList': userListComponent });
    }
    prerenderChildrens() {
        if (this.getProps().userList) {
            this.renderToSelector([this.getProps().userList], '.modal__section .modal__content_with_scroll');
        }
        this.afterRenderChildrens();
    }
    subscribe() {
        const closeMdAddUser = this.getElement().querySelector('.modal__section .modal__close');
        if (closeMdAddUser) {
            closeMdAddUser.addEventListener('click', () => { this.toggle(); });
        }
        const btn = this.getElement().querySelector('.modal__section .modal__button_bg_dark-green');
        if (btn) {
            btn.addEventListener('click', () => { this.deleteUsers(); });
        }
    }
    toggle() {
        if (this.getElement().classList.contains('blackout_state_show')) {
            this.getProps().userList.setProps({ 'root': [] });
            this.getElement().classList.remove('blackout_state_show');
        }
        else {
            if (this.chatService.getSelectedDialog() !== null) {
                this.getProps().userList.setProps({ 'root': this.chatService.getProfilesForDelete() });
            }
            this.getElement().classList.add('blackout_state_show');
        }
    }
    markUser(id) {
        const users = this.getElement().querySelectorAll('[data-id]');
        for (let user of users) {
            const dataId = user.getAttribute('data-id');
            if (dataId !== null) {
                if (dataId === id) {
                    if (user.classList.contains('list__item_selected')) {
                        user.classList.remove('list__item_selected');
                    }
                    else {
                        user.classList.add('list__item_selected');
                    }
                    break;
                }
            }
        }
    }
    deleteUsers() {
        const users = this.getElement().querySelectorAll('.list__item_selected');
        const ids = [];
        for (let user of users) {
            const dataId = user.getAttribute('data-id');
            if (dataId !== null) {
                ids.push(parseInt(dataId));
            }
        }
        if (ids.length > 0) {
            this.chatService.delUserFromDialog(ids);
        }
        this.toggle();
    }
}
//# sourceMappingURL=modal-del-user.js.map