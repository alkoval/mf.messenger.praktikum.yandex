import { BaseComponent } from '../../core/base-component/base-component.js';
import { FormValidationService } from '../../core/core.js';
import { LoginPageTemplate } from './login.template.js';
import { FormCardComponent } from '../../shared/components/form-card/form-card.js';
import { FormField, FormCard } from '../../shared/shared.models.js';
import { AuthService } from '../../core/core.js';
export class LoginPageComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new LoginPageTemplate());
        this.formComponent = null;
        this.form = null;
        this.formValidationService = new FormValidationService();
        this.authService = AuthService.getInstance();
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
    prerenderChildrens() {
        this.form = new FormCard('Вход', 'Авторизоваться', './signin.html', 'Нет аккаунта?');
        this.form.fields.push(new FormField('text', 'login', 'Логин', 'Некорректное значение', 'word'));
        this.form.fields.push(new FormField('password', 'password', 'Пароль', 'Некорректное значение', 'word'));
        this.formComponent = new FormCardComponent(this.form, this.templator);
        this.childrens.push(this.formComponent);
        this.renderChildrens();
    }
    subscribe() {
        const self = this.form;
        const button = this.getContent().querySelector('.card__button, .button_bg_dark-green');
        if (button !== null) {
            button.addEventListener('click', () => { this.login(self); });
        }
    }
    login(form) {
        if (form !== null) {
            let valid = true;
            for (let field of form.fields) {
                if (!this.formValidationService.isValid(field.validType, field.value)) {
                    valid = false;
                }
            }
            if (valid) {
                this.authService.login(form.fields.find(e => e.name === 'login').value, form.fields.find(e => e.name === 'password').value);
            }
        }
    }
}
//# sourceMappingURL=login.js.map