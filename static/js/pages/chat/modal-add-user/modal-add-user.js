import { BaseComponent } from '../../../core/base-component/base-component.js';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.js';
import { ProfileService } from '../../services/profile.service.js';
import { ChatUserListComponent } from '../chat-user-list/chat-user-list.js';
import { ModalAddUserTemplate } from './modal-add-user.template.js';
export class ModalAddUserComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ModalAddUserTemplate());
        this.profileService = ProfileService.getInstance();
        this.onInit();
    }
    onInit() {
        const userListComponent = new ChatUserListComponent({ 'root': [], 'md': this }, this.templator);
        userListComponent.getEventEmitter().on('user-list-selected', this.addUser.bind(this));
        this.setProps({ 'userList': userListComponent });
    }
    prerenderChildrens() {
        if (this.childrens.length === 0 && this.getProps().field) {
            const fieldComponent = new FormFieldComponent({ 'root': this.getProps().field }, this.templator);
            const field = fieldComponent.getElement().querySelector('.form-field__input');
            if (field) {
                field.addEventListener('keyup', (e) => { this.searchUser(e.target); });
            }
            this.renderToSelector([fieldComponent], '.modal__section .modal__content-field');
        }
        if (this.getProps().userList) {
            this.renderToSelector([this.getProps().userList], '.modal__section .modal__content_with_scroll');
        }
        this.afterRenderChildrens();
    }
    subscribe() {
        const closeMdAddUser = this.getElement().querySelectorAll('.modal__section .modal__close')[0];
        if (closeMdAddUser) {
            closeMdAddUser.addEventListener('click', () => { this.toggle(); });
        }
        const btn = this.getElement().querySelector('.modal__button');
        if (btn) {
            btn.addEventListener('click', () => { this.add(); });
        }
    }
    toggle() {
        if (this.getElement().classList.contains('blackout_state_show')) {
            this.getElement().classList.remove('blackout_state_show');
        }
        else {
            this.getElement().classList.add('blackout_state_show');
        }
    }
    addUser(id) {
        console.log(id);
    }
    searchUser(input) {
        if (input.value.length > 0) {
            this.profileService.search(input.value).then(response => {
                this.getProps().userList.setProps({ 'root': response });
            });
        }
        else {
            this.getProps().userList.setProps({ 'root': [] });
        }
    }
}
//# sourceMappingURL=modal-add-user.js.map