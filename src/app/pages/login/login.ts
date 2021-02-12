import { BaseComponent } from '../../core/base-component/base-component.js';
import { Templator, FormValidationService } from '../../core/core.js';
import { LoginPageTemplate } from './login.template.js';
import { FormCardComponent } from '../../shared/components/form-card/form-card.js';
import { PropsComponent } from '../../shared/interfaces/props-component.js';
import { User, FormField, FormCard } from '../../shared/shared.models.js';
import { LoginService } from './login.service.js';

export class LoginPageComponent extends BaseComponent {
    private formComponent: BaseComponent | null;
    public form: FormCard | null;
    private formValidationService: FormValidationService;
    private loginService: LoginService;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new LoginPageTemplate());
        this.formComponent = null;
        this.form = null;
        this.formValidationService = new FormValidationService();
        this.loginService = new LoginService();
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
                this.loginService.login(
                    form.fields.find(e => e.name === 'login')!.value,
                    form.fields.find(e => e.name === 'password')!.value
                );
            }
        }
    }
}