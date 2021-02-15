import { BaseComponent } from '../../../core/base-component/base-component.js';
import { FormValidationService } from '../../../core/core.js';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.js';
import { FormField } from '../../../shared/shared.models.js';
import { ChatService } from '../../services/chat.service.js';
import { ModalNewDialogTemplate } from './modal-new-dialogtemplate.js';
export class ModalNewDialogComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ModalNewDialogTemplate());
        this.chatService = new ChatService();
        this.formValidationService = new FormValidationService();
        this.field = null;
        this.onInit();
    }
    onInit() {
        this.field = new FormField('text', 'dialogName', 'Имя диалога', 'Некорректное значение', 'word');
    }
    prerenderChildrens() {
        this.childrens.push(new FormFieldComponent({ 'root': this.field }, this.templator));
        this.renderChildrensToSelector('.modal__content');
        this.afterRenderChildrens();
    }
    subscribe() {
        const mdAddUser = this.getElement().querySelectorAll('.chat__toolbar .chat__link')[0];
        if (mdAddUser) {
            mdAddUser.addEventListener('click', () => { this.toggle(); });
        }
        const closeMdAddUser = this.getElement().querySelectorAll('.modal__section .modal__close')[0];
        if (closeMdAddUser) {
            closeMdAddUser.addEventListener('click', () => { this.toggle(); });
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
        if (this.formValidationService.isValid(this.field.value, this.field.validType)) {
            this.chatService.createDialog(this.field.value).then(response => {
                if (response) {
                    this.chatService.loadDialogs();
                }
            });
        }
    }
}
//# sourceMappingURL=modal-new-dialog.js.map