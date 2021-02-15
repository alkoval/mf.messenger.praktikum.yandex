import { BaseComponent } from '../../../core/base-component/base-component.js';
import { FormValidationService } from '../../../core/core.js';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.js';
import { ChatService } from '../../services/chat.service.js';
import { ModalNewDialogTemplate } from './modal-new-dialogtemplate.js';
export class ModalNewDialogComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ModalNewDialogTemplate());
        this.chatService = ChatService.getInstance();
        this.formValidationService = new FormValidationService();
    }
    prerenderChildrens() {
        this.childrens.push(new FormFieldComponent({ 'root': this.getProps().field }, this.templator));
        this.renderChildrensToSelector('.modal__section .modal__content');
        this.afterRenderChildrens();
    }
    subscribe() {
        const closeMdAddUser = this.getElement().querySelectorAll('.modal__section .modal__close')[0];
        if (closeMdAddUser) {
            closeMdAddUser.addEventListener('click', () => { this.toggle(); });
        }
        const btn = this.getElement().querySelector('.modal__button');
        if (btn) {
            btn.addEventListener('click', () => { this.createDialog(); });
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
    createDialog() {
        const field = this.getProps().field;
        if (this.formValidationService.isValid(field.validType, field.value)) {
            this.chatService.createDialog(field.value);
            this.toggle();
        }
    }
}
//# sourceMappingURL=modal-new-dialog.js.map