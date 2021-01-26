import { BaseComponent } from '../../core/base-component/base-component.js';
import { ProfileGroupTextComponent } from '../../shared/components/profile-group-text/profile-group-text.js';
import { FormField } from '../../shared/models/form-field.js';
import { ProfilePageTemplate } from './profile.template.js';
export class ProfilePageComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ProfilePageTemplate());
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
    prerenderChildrens() {
        const profile = this.getProps();
        this.childrens.push(new ProfileGroupTextComponent(new FormField('text', 'email', 'Почта', 'Некорректное значение', 'email', profile.email), this.templator));
        this.childrens.push(new ProfileGroupTextComponent(new FormField('text', 'login', 'Логин', 'Некорректное значение', 'login', profile.login), this.templator));
        this.childrens.push(new ProfileGroupTextComponent(new FormField('text', 'name', 'Имя', 'Некорректное значение', 'word', profile.name), this.templator));
        this.childrens.push(new ProfileGroupTextComponent(new FormField('text', 'secondName', 'Фамилия', 'Некорректное значение', 'word', profile.secondName), this.templator));
        this.childrens.push(new ProfileGroupTextComponent(new FormField('text', 'nickname', 'Имя в чате', 'Некорректное значение', 'word', profile.nickname), this.templator));
        this.childrens.push(new ProfileGroupTextComponent(new FormField('text', 'phone', 'Телефон', 'Некорректное значение', 'phone', profile.phone), this.templator));
        this.renderChildrensToSelector('.profile__body');
    }
    subscribe() {
        const showMd = this.getElement().querySelector('.profile__avatar-link');
        if (showMd) {
            showMd.addEventListener('click', () => { this.toggleModal(); });
        }
        const hideMd = this.getElement().querySelector('.modal__button_bg_dark-green');
        if (hideMd) {
            hideMd.addEventListener('click', () => { this.toggleModal(); });
        }
        const inputFile = this.getElement().querySelector('.modal__file-upload__input');
        if (inputFile) {
            inputFile.addEventListener('change', (e) => { this.checkFile(e.target); });
        }
    }
    toggleModal() {
        const blackout = this.getElement().querySelector('.blackout');
        if (blackout) {
            if (blackout.classList.contains('blackout_state_show')) {
                blackout.classList.remove('blackout_state_show');
            }
            else {
                blackout.classList.add('blackout_state_show');
            }
        }
    }
    checkFile(target) {
        const label = this.getElement().querySelector(".modal__file-upload__label");
        const err = this.getElement().querySelector(".modal__text, .modal__text_bg_red");
        const file = target.files[0];
        let valid = false;
        if (file !== undefined) {
            if (file.name.endsWith(".jpg") || file.name.endsWith(".png")) {
                if (file.size < 1e7) {
                    label.textContent = file.name;
                    valid = true;
                }
                else {
                    err.textContent = "Превышен допустимый размер!";
                }
            }
            else {
                err.textContent = "Неверный формат!";
            }
        }
        else {
            err.textContent = "Ошибка чтения файла!";
        }
        if (valid) {
            err.classList.add("modal__text_display_none");
        }
        else {
            err.classList.remove("modal__text_display_none");
        }
    }
}
//# sourceMappingURL=profile.js.map