import { BaseComponent } from '../../../core/base-component/base-component.js';
import { FormFieldTemplate } from './form-field.template.js';
import FormValidationService from '../../../core/services/form-validation.service.js';
export class FormFieldComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new FormFieldTemplate());
        this.formField = props.root;
        this.formValidationService = new FormValidationService();
    }
    subscribe() {
        const input = this.getContent().querySelector('.form-field__input');
        if (input !== null) {
            input.addEventListener('blur', (e) => {
                if (e.target !== null) {
                    this.formField.value = e.target.value;
                    if (this.formValidationService.isValid(this.formField.validType, this.formField.value)) {
                        e.target.classList.remove('form-field__input_invalid');
                    }
                    else {
                        e.target.classList.add('form-field__input_invalid');
                    }
                }
            });
            input.addEventListener('focus', (e) => {
                if (e.target !== null) {
                    e.target.classList.remove('form-field__input_invalid');
                }
            });
        }
    }
}
//# sourceMappingURL=form-field.js.map