import { BaseComponent } from '../../core/base-component/base-component.js';
import { Templator } from '../../core/core.js';
import { ProfileGroupInputComponent } from '../../shared/components/profile-group-input/profile-group-input.js';
import { PropsComponent } from '../../shared/interfaces/props-component.js';
import { FormField } from '../../shared/models/form-field.js';
import { Profile } from '../../shared/models/profile.js';
import { ChangeProfilePageTemplate } from './change-profile.template.js';
import FormValidationService from '../../core/services/form-validation.service.js';
import { ButtonComponent } from '../../shared/components/button/button.js';
import { Button, BUTTON_STYLE } from '../../shared/models/button.js';

export class ChangeProfilePageComponent extends BaseComponent {
    private formValidationService: FormValidationService;
    public fields: FormField[];
    public profile: Profile;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ChangeProfilePageTemplate());
        this.formValidationService = new FormValidationService();
        this.fields = [];
        this.profile = props as Profile;
    }

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }

    public prerenderChildrens(): void {
        const profile = this.getProps() as Profile;
        this.fields = [
            new FormField('text', 'email', 'Почта', 'Некорректное значение', 'email', profile.email),
            new FormField('text', 'login', 'Логин', 'Некорректное значение', 'login', profile.login),
            new FormField('text', 'name', 'Имя', 'Некорректное значение', 'word', profile.name),
            new FormField('text', 'secondName', 'Фамилия', 'Некорректное значение', 'word', profile.secondName),
            new FormField('text', 'nickname', 'Имя в чате', 'Некорректное значение', 'word', profile.nickname),
            new FormField('text', 'phone', 'Телефон', 'Некорректное значение', 'phone', profile.phone)
        ];
        for (let field of this.fields) {
            this.childrens.push(new ProfileGroupInputComponent(field, this.templator));
        }
        this.renderChildrensToSelector('.profile__body');

        const btn = new ButtonComponent(new Button('Сохранить', BUTTON_STYLE.BG_DARK_GREEN, 'button'), this.templator);
        this.childrens.push(btn);
        this.renderToSelector([btn], '.profile__footer');
    }

    public subscribe(): void {
        const fields = this.fields;
        const button = this.getContent().querySelector('.button, .button_bg_dark-green');
        if (button !== null) {
            button.addEventListener('click', () => { this.save(fields) });
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
            const newProfile = new Profile();
            newProfile.id = this.profile.id;
            newProfile.email = fields.find(e => e.name === 'email')!.value;
            newProfile.login = fields.find(e => e.name === 'login')!.value;
            newProfile.name = fields.find(e => e.name === 'name')!.value;
            newProfile.secondName = fields.find(e => e.name === 'secondName')!.value;
            newProfile.nickname = fields.find(e => e.name === 'nickname')!.value;
            newProfile.phone = fields.find(e => e.name === 'phone')!.value;
            console.log(newProfile);
        }
    }
}