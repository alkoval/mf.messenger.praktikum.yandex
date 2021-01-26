import { BaseComponent } from '../../core/base-component/base-component.js';
import { ProfileGroupInputComponent } from '../../shared/components/profile-group-input/profile-group-input.js';
import { FormField } from '../../shared/models/form-field.js';
import { Profile } from '../../shared/models/profile.js';
import { ChangePasswordPageTemplate } from './change-password.template.js';
import FormValidationService from '../../core/services/form-validation.service.js';
import { ButtonComponent } from '../../shared/components/button/button.js';
import { Button, BUTTON_STYLE } from '../../shared/models/button.js';
export class ChangePasswordPageComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ChangePasswordPageTemplate());
        this.formValidationService = new FormValidationService();
        this.fields = [];
        this.profile = props;
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
    prerenderChildrens() {
        this.fields = [
            new FormField('password', 'oldPassword', 'Старый пароль', 'Некорректное значение', 'password', ''),
            new FormField('password', 'password', 'Новый пароль', 'Некорректное значение', 'password', ''),
            new FormField('password', 'rePassword', 'Повторите новый пароль', 'Некорректное значение', 'password', ''),
        ];
        for (let field of this.fields) {
            this.childrens.push(new ProfileGroupInputComponent(field, this.templator));
        }
        this.renderChildrensToSelector('.profile__body');
        const btn = new ButtonComponent(new Button('Сохранить', BUTTON_STYLE.BG_DARK_GREEN, 'button'), this.templator);
        this.childrens.push(btn);
        this.renderToSelector([btn], '.profile__footer');
    }
    subscribe() {
        const fields = this.fields;
        const button = this.getContent().querySelector('.button, .button_bg_dark-green');
        if (button !== null) {
            button.addEventListener('click', () => { this.save(fields); });
        }
    }
    save(fields) {
        let valid = true;
        for (let field of this.fields) {
            if (!this.formValidationService.isValid(field.validType, field.value)) {
                valid = false;
                break;
            }
        }
        valid = valid && fields.find(e => e.name === 'password').value == this.profile.password ? true : false;
        const password = fields.find(e => e.name === 'password').value;
        const rePassword = fields.find(e => e.name === 'rePassword').value;
        valid = valid && password === rePassword ? true : false;
        if (valid) {
            const newProfile = new Profile();
            Object.assign(newProfile, this.profile);
            newProfile.password = password;
            console.log(newProfile);
        }
        else {
            console.log('Введен неверный старый пароль.');
        }
    }
}
//# sourceMappingURL=change-password.js.map