import { BaseComponent } from '../../core/base-component/base-component.js';
import { Templator } from '../../core/core.js';
import { PropsComponent } from '../../shared/interfaces/props-component.js';
import { LoginPageTemplate } from './login.template.js';
import { FormCardComponent } from '../../shared/components/form-card/form-card.js';
import { FormCard } from '../../shared/models/form-card.js';
import { FormField } from '../../shared/models/form-field.js';
import FormValidationService from '../../core/services/form-validation.service.js';
import { User } from '../../shared/models/user.js';

export class LoginPageComponent extends BaseComponent {
    private formComponent: BaseComponent | null;
    public form: FormCard | null;
    private formValidationService: FormValidationService;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new LoginPageTemplate());
        this.formComponent = null;
        this.form = null;
        this.formValidationService = new FormValidationService();
    }

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }

    public prerenderChildrens(): void {
        this.form = new FormCard('Вход', 'Авторизоваться', './signin.html', 'Нет аккаунта?');
        this.form.fields.push(new FormField('text', 'login', 'Логин', 'Некорректное значение', 'word'));
        this.form.fields.push(new FormField('password', 'password', 'Пароль', 'Некорректное значение', 'word'));

        this.formComponent = new FormCardComponent(this.form, this.templator);
        this.childrens.push(this.formComponent);
        this.renderChildrens();
    }

    public subscribe(): void {
        const self = this.form;
        const button = this.getContent().querySelector('.card__button, .button_bg_dark-green');
        if (button !== null) {
            button.addEventListener('click', () => { this.login(self) });
        }
    }

    public login(form: FormCard | null): void {
        if (form !== null) {
            let valid = true;
            for (let field of form.fields) {
                if (!this.formValidationService.isValid(field.validType, field.value)) {
                    valid = false;
                }
            }

            if (valid) {
                const user = new User();
                user.login = form.fields.find(e => e.name === 'login')!.value;
                user.password = form.fields.find(e => e.name === 'password')!.value;
                console.log(user);
            }
        }
    }
}