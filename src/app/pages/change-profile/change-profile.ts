import { BaseComponent } from '../../core/base-component/base-component'
import { Templator } from '../../core/core'
import { ProfileGroupInputComponent } from '../../shared/components/profile-group-input/profile-group-input'
import { PropsComponent, OnInit } from '../../shared/shared.interfaces'
import { Profile, FormField, Button, BUTTON_STYLE } from '../../shared/shared.models'
import { ChangeProfilePageTemplate } from './change-profile.template'
import FormValidationService from '../../core/services/form-validation.service'
import { ButtonComponent } from '../../shared/components/button/button'
import { ProfileService, PROFILE_EVENTS } from '../services/profile.service'
import { Router } from '../../core/router/router'

export class ChangeProfilePageComponent extends BaseComponent implements OnInit {
    private formValidationService: FormValidationService;
    public fields: FormField[];
    private profileService: ProfileService;
    private router: Router;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ChangeProfilePageTemplate());
        this.formValidationService = new FormValidationService();
        this.fields = [];
        this.profileService = ProfileService.getInstance();
        this.router = Router.getInstance();
        this.onInit();
    }

    public onInit(): void {
        this.profileService.subscribe().on(PROFILE_EVENTS.PROFILE_UPDATE, this.updateProfile.bind(this));
        const profile = this.profileService.getProfile();
        if (profile !== null) {
            this.setProps({ "root": profile });
        }
    }

    public updateProfile(profile: Profile): void {
        if (profile !== null) {
            this.setProps({ "root": profile });
        }
    }

    public prerenderChildrens(): void {
        const profile = this.getProps().root;
        if (profile && this.childrens.length === 0) {
            this.fields = [
                new FormField('text', 'email', 'Почта', 'Некорректное значение', 'email', profile.email),
                new FormField('text', 'login', 'Логин', 'Некорректное значение', 'login', profile.login),
                new FormField('text', 'name', 'Имя', 'Некорректное значение', 'word', profile.name),
                new FormField('text', 'secondName', 'Фамилия', 'Некорректное значение', 'word', profile.secondName),
                new FormField('text', 'nickname', 'Имя в чате', 'Некорректное значение', 'word', profile.nickname),
                new FormField('text', 'phone', 'Телефон', 'Некорректное значение', 'phone', profile.phone)
            ];

            for (let field of this.fields) {
                this.childrens.push(new ProfileGroupInputComponent({ "root": field }, this.templator));
            }
            this.renderChildrensToSelector('.profile__body');

            const btn = new ButtonComponent({ "root": new Button('Сохранить', BUTTON_STYLE.BG_DARK_GREEN, 'button') }, this.templator);
            this.childrens.push(btn);
            this.renderToSelector([btn], '.profile__footer');
            this.afterRenderChildrens();
        } else {
            this.renderChildrensToSelector('.profile__body');
        }
    }

    public subscribe(): void {
        const fields = this.fields;
        const button = this.getContent().querySelector('.button, .button_bg_dark-green');
        if (button !== null) {
            button.addEventListener('click', () => { this.save(fields) });
        }
        const backLink = this.getElement().querySelector('.profile__back');
        if (backLink) {
            backLink.addEventListener('click', () => { this.router.back() });
        }
    }

    public save(fields: FormField[]): void {
        let valid = true;
        for (let field of this.fields) {
            if (!this.formValidationService.isValid(field.validType, field.value)) {
                valid = false;
                break;
            }
        }

        if (valid) {
            const profile = this.getProps().root;
            const newProfile = new Profile();
            newProfile.id = profile.id;
            newProfile.email = fields.find(e => e.name === 'email')!.value;
            newProfile.login = fields.find(e => e.name === 'login')!.value;
            newProfile.name = fields.find(e => e.name === 'name')!.value;
            newProfile.secondName = fields.find(e => e.name === 'secondName')!.value;
            newProfile.nickname = fields.find(e => e.name === 'nickname')!.value;
            newProfile.phone = fields.find(e => e.name === 'phone')!.value;

            this.profileService.saveProfile(newProfile);
        }
    }
}