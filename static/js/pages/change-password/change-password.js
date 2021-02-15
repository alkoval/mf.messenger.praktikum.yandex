import { BaseComponent } from '../../core/base-component/base-component.js';
import { ProfileGroupInputComponent } from '../../shared/components/profile-group-input/profile-group-input.js';
import { FormField, Button, BUTTON_STYLE } from '../../shared/shared.models.js';
import { ChangePasswordPageTemplate } from './change-password.template.js';
import FormValidationService from '../../core/services/form-validation.service.js';
import { ButtonComponent } from '../../shared/components/button/button.js';
import { ProfileService } from '../services/profile.service.js';
import { Router } from '../../core/router/router.js';
export class ChangePasswordPageComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ChangePasswordPageTemplate());
        this.profileService = new ProfileService();
        this.formValidationService = new FormValidationService();
        this.fields = [];
        this.router = Router.getInstance();
    }
    prerenderChildrens() {
        this.fields = [
            new FormField('password', 'oldPassword', 'Старый пароль', 'Некорректное значение', 'password', ''),
            new FormField('password', 'password', 'Новый пароль', 'Некорректное значение', 'password', ''),
            new FormField('password', 'rePassword', 'Повторите новый пароль', 'Некорректное значение', 'password', ''),
        ];
        for (let field of this.fields) {
            this.childrens.push(new ProfileGroupInputComponent({ "root": field }, this.templator));
        }
        this.renderChildrensToSelector('.profile__body');
        const btn = new ButtonComponent({ "root": new Button('Сохранить', BUTTON_STYLE.BG_DARK_GREEN, 'button') }, this.templator);
        this.childrens.push(btn);
        this.renderToSelector([btn], '.profile__footer');
    }
    subscribe() {
        const fields = this.fields;
        const button = this.getContent().querySelector('.button, .button_bg_dark-green');
        if (button !== null) {
            button.addEventListener('click', () => { this.save(fields); });
        }
        const backLink = this.getElement().querySelector('.profile__back');
        if (backLink) {
            backLink.addEventListener('click', () => { this.router.back(); });
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
        const oldPassword = fields.find(e => e.name === 'oldPassword').value;
        const password = fields.find(e => e.name === 'password').value;
        const rePassword = fields.find(e => e.name === 'rePassword').value;
        valid = valid && password === rePassword ? true : false;
        if (valid) {
            this.profileService.changePassword(oldPassword, password);
        }
    }
}
//# sourceMappingURL=change-password.js.map