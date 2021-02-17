import { BaseComponent } from '../../core/base-component/base-component'
import { Templator, FormValidationService } from '../../core/core'
import { LoginPageTemplate } from './login.template'
import { FormCardComponent } from '../../shared/components/form-card/form-card'
import { PropsComponent } from '../../shared/interfaces/props-component'
import { FormField, FormCard } from '../../shared/shared.models'
import { AuthService } from '../../core/core'
import { Router } from '../../core/router/router'
import { ProfileService } from '../services/profile.service'
import { UserResponse } from '../../core/api/interfaces/user-response'

export class LoginPageComponent extends BaseComponent {
    private formComponent: BaseComponent | null;
    public form: FormCard | null;
    private formValidationService: FormValidationService;
    private authService: AuthService;
    private profileService: ProfileService;
    private router: Router;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new LoginPageTemplate());
        this.formComponent = null;
        this.form = null;
        this.formValidationService = new FormValidationService();
        this.authService = AuthService.getInstance();
        this.profileService = ProfileService.getInstance();
        this.router = Router.getInstance();
    }

    public prerenderChildrens(): void {
        this.form = new FormCard('Вход', 'Авторизоваться', '/signin', 'Нет аккаунта?');
        this.form.fields.push(new FormField('text', 'login', 'Логин', 'Некорректное значение', 'word'));
        this.form.fields.push(new FormField('password', 'password', 'Пароль', 'Некорректное значение', 'word'));

        this.formComponent = new FormCardComponent({ "root": this.form }, this.templator);
        this.childrens.push(this.formComponent);
        this.renderChildrens();
        this.afterRenderChildrens();
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
                this.authService.login(
                    form.fields.find(e => e.name === 'login')!.value,
                    form.fields.find(e => e.name === 'password')!.value
                ).then(
                    login => {
                        if (login) {
                            this.authService.getInfoUser().then(
                                userInfo => {
                                    const profile = this.profileService.userResToProfile(userInfo as UserResponse);
                                    this.profileService.setProfile(profile);
                                    this.router.go('/chat');
                                }
                            )
                        }
                    }
                );
            }
        }
    }
}