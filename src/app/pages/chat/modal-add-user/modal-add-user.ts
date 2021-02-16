import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.js';
import { PropsComponent } from '../../../shared/shared.interfaces.js';
import { ModalAddUserTemplate } from './modal-add-user.template.js';

export class ModalAddUserComponent extends BaseComponent {

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ModalAddUserTemplate());
    }

    public prerenderChildrens(): void {
        if (this.getProps().field) {
            this.renderToSelector([new FormFieldComponent({ 'root': this.getProps().field }, this.templator)], '.modal__section .modal__content');
        }
        this.afterRenderChildrens();
    }

    public subscribe(): void {
        const closeMdAddUser = this.getElement().querySelectorAll('.modal__section .modal__close')[0];
        if (closeMdAddUser) {
            closeMdAddUser.addEventListener('click', () => { this.toggle() });
        }
        const btn = this.getElement().querySelector('.modal__button');
        if (btn) {
            btn.addEventListener('click', () => { this.add() });
        }
    }

    public toggle(): void {
        if (this.getElement().classList.contains('blackout_state_show')) {
            this.getElement().classList.remove('blackout_state_show');
        } else {
            this.getElement().classList.add('blackout_state_show');
        }
    }

    public add(): void {

    }

    public drawUsers(): void {

    }
}