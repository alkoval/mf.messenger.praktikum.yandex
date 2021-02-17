import { BaseComponent } from '../../../core/base-component/base-component'
import { FormValidationService, Templator } from '../../../core/core'
import { FormFieldComponent } from '../../../shared/components/form-field/form-field'
import { PropsComponent } from '../../../shared/shared.interfaces'
import { ChatService } from '../../services/chat.service'
import { ModalNewDialogTemplate } from './modal-new-dialogtemplate'

export class ModalNewDialogComponent extends BaseComponent {
    private chatService: ChatService;
    private formValidationService: FormValidationService;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ModalNewDialogTemplate());
        this.chatService = ChatService.getInstance();
        this.formValidationService = new FormValidationService();
    }

    public prerenderChildrens(): void {
        this.childrens.push(new FormFieldComponent({ 'root': this.getProps().field }, this.templator));
        this.renderChildrensToSelector('.modal__section .modal__content');
        this.afterRenderChildrens();
    }

    public subscribe(): void {
        const closeMdAddUser = this.getElement().querySelectorAll('.modal__section .modal__close')[0];
        if (closeMdAddUser) {
            closeMdAddUser.addEventListener('click', () => { this.toggle() });
        }
        const btn = this.getElement().querySelector('.modal__button');
        if (btn) {
            btn.addEventListener('click', () => { this.createDialog() });
        }
    }

    public toggle(): void {
        if (this.getElement().classList.contains('blackout_state_show')) {
            this.getElement().classList.remove('blackout_state_show');
        } else {
            this.getElement().classList.add('blackout_state_show');
        }
    }

    public createDialog(): void {
        const field = this.getProps().field;
        if (this.formValidationService.isValid(field.validType, field.value)) {
            this.chatService.createDialog(field.value);
            this.toggle();
        }
    }
}