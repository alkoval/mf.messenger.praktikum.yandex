import { BaseComponent } from '../../core/base-component/base-component.js';
import { LoginPageTemplate } from './login.template.js';
import { FormCardComponent } from '../../shared/components/form-card/form-card.js';
import { FormCard } from '../../shared/models/form-card.js';
import { FormField } from '../../shared/models/form-field.js';
import FormValidationService from '../../core/services/form-validation.service.js';
import { User } from '../../shared/models/user.js';
export class LoginPageComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new LoginPageTemplate());
        this.formComponent = null;
        this.form = null;
        this.formValidationService = new FormValidationService();
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
        const button = this.getContent().querySelector('.card__button, .card__button_bg_dark-green');
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
                const user = new User();
                user.login = form.fields.find(e => e.name === 'login').value;
                user.password = form.fields.find(e => e.name === 'password').value;
                console.log(user);
            }
        }
    }
}
//# sourceMappingURL=login.js.map