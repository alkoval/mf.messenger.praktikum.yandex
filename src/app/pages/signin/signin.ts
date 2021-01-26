import { BaseComponent } from '../../core/base-component/base-component.js';
import { Templator } from '../../core/core.js';
import { PropsComponent } from '../../shared/interfaces/props-component.js';
import { SigninPageTemplate } from './signin.template.js';
import { FormCardComponent } from '../../shared/components/form-card/form-card.js';
import { FormCard } from '../../shared/models/form-card.js';
import { FormField } from '../../shared/models/form-field.js';
import FormValidationService from '../../core/services/form-validation.service.js';
import { Profile } from '../../shared/models/profile.js';

export class SigninPageComponent extends BaseComponent {
    private formComponent: BaseComponent | null;
    public form: FormCard | null;
    private formValidationService: FormValidationService;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new SigninPageTemplate());
        this.formComponent = null;
        this.form = null;
        this.formValidationService = new FormValidationService();
    }

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }

    public prerenderChildrens(): void {
        this.form = new FormCard('Регистрация', 'Зарегистрироваться', './login.html', 'Войти');
        this.form.fields.push(new FormField('email', 'email', 'Почта', 'Некорректное значение', 'email'));
        this.form.fields.push(new FormField('text', 'login', 'Логин', 'Латинские символы, цифры, длина 4-12', 'login'));
        this.form.fields.push(new FormField('text', 'name', 'Имя', 'Некорректное значение', 'word'));
        this.form.fields.push(new FormField('text', 'secondName', 'Фамилия', 'Некорректное значение', 'word'));
        this.form.fields.push(new FormField('text', 'phone', 'Телефон', 'Некорректное значение', 'phone'));
        this.form.fields.push(new FormField('password', 'password', 'Пароль', 'Некорректное значение', 'password'));
        this.form.fields.push(new FormField('password', 'rePassword', 'Повторите пароль', 'Пароли не совпадают', 'password'));
        this.formComponent = new FormCardComponent(this.form, this.templator);
        this.childrens.push(this.formComponent);
        this.renderChildrens();
    }

    public subscribe(): void {
        const form = this.form;
        const button = this.getContent().querySelector('.card__button, .card__button_bg_dark-green');
        if (button !== null) {
            button.addEventListener('click', () => { this.signin(form) });
        }
    }

    public signin(form: FormCard | null): void {
        if (form !== null) {
            let valid = true;
            for (let field of form.fields) {
                if (!this.formValidationService.isValid(field.validType, field.value)) {
                    valid = false;
                    break;
                }
            }

            valid = valid
                && form.fields.find(e => e.name === 'password')!.value == form.fields.find(e => e.name === 'rePassword')!.value
                ? true : false;

            if (valid) {
                const profile = new Profile();
                profile.name = form.fields.find(e => e.name === 'name')!.value;
                profile.secondName = form.fields.find(e => e.name === 'secondName')!.value;
                profile.email = form.fields.find(e => e.name === 'email')!.value;
                profile.phone = form.fields.find(e => e.name === 'phone')!.value;
                profile.password = form.fields.find(e => e.name === 'password')!.value;
                profile.rePassword = form.fields.find(e => e.name === 'rePassword')!.value;
                profile.login = form.fields.find(e => e.name === 'login')!.value;
                console.log(profile);
            }
        }
    }
}