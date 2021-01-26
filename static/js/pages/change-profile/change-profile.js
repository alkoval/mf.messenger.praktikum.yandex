import { BaseComponent } from '../../core/base-component/base-component.js';
import { ProfileGroupInputComponent } from '../../shared/components/profile-group-input/profile-group-input.js';
import { FormField } from '../../shared/models/form-field.js';
import { Profile } from '../../shared/models/profile.js';
import { ChangeProfilePageTemplate } from './change-profile.template.js';
import FormValidationService from '../../core/services/form-validation.service.js';
export class ChangeProfilePageComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ChangeProfilePageTemplate());
        this.formValidationService = new FormValidationService();
        this.fields = [];
        this.profile = props;
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
    prerenderChildrens() {
        const profile = this.getProps();
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
    }
    subscribe() {
        const fields = this.fields;
        const button = this.getContent().querySelector('.profile__button, .profile__button_bg_dark-green');
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
        if (valid) {
            const newProfile = new Profile();
            newProfile.id = this.profile.id;
            newProfile.email = fields.find(e => e.name === 'email').value;
            newProfile.login = fields.find(e => e.name === 'login').value;
            newProfile.name = fields.find(e => e.name === 'name').value;
            newProfile.secondName = fields.find(e => e.name === 'secondName').value;
            newProfile.nickname = fields.find(e => e.name === 'nickname').value;
            newProfile.phone = fields.find(e => e.name === 'phone').value;
            console.log(newProfile);
        }
    }
}
//# sourceMappingURL=change-profile.js.map