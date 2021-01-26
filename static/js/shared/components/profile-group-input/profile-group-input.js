import { BaseComponent } from '../../../core/base-component/base-component.js';
import { FormValidationService } from '../../../core/core.js';
import { ProfileGroupInputTemplate } from './profile-group-input.template.js';
export class ProfileGroupInputComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ProfileGroupInputTemplate());
        this.formField = props;
        this.formValidationService = new FormValidationService();
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
    subscribe() {
        const input = this.getContent().querySelector('.profile__input');
        if (input !== null) {
            input.addEventListener('blur', (e) => {
                if (e.target !== null) {
                    this.formField.value = e.target.value;
                    if (this.formValidationService.isValid(this.formField.validType, this.formField.value)) {
                        e.target.classList.remove('profile__input_invalid');
                    }
                    else {
                        e.target.classList.add('profile__input_invalid');
                    }
                }
            });
            input.addEventListener('focus', (e) => {
                if (e.target !== null) {
                    e.target.classList.remove('profile__input_invalid');
                }
            });
        }
    }
}
//# sourceMappingURL=profile-group-input.js.map