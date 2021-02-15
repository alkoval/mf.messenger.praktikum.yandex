import { BaseComponent } from '../../core/base-component/base-component.js';
import { AuthService, Templator } from '../../core/core.js';
import { Router } from '../../core/router/router.js';
import { ProfileGroupTextComponent } from '../../shared/components/profile-group-text/profile-group-text.js';
import { OnInit, PropsComponent } from '../../shared/shared.interfaces.js';
import { FormField, Profile } from '../../shared/shared.models.js';
import { ProfileService, PROFILE_EVENTS } from '../services/profile.service.js';
import { ProfilePageTemplate } from './profile.template.js';


export class ProfilePageComponent extends BaseComponent implements OnInit {
    private authService: AuthService;
    private router: Router;
    private profileService: ProfileService;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ProfilePageTemplate());
        this.authService = AuthService.getInstance();
        this.router = Router.getInstance();
        this.profileService = ProfileService.getInstance();
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
        if (profile) {
            if (this.childrens.length > 0) {
                this.childrens = [];
            }
            this.childrens.push(new ProfileGroupTextComponent({ "root": new FormField('text', 'email', 'Почта', 'Некорректное значение', 'email', profile.email) }, this.templator));
            this.childrens.push(new ProfileGroupTextComponent({ "root": new FormField('text', 'login', 'Логин', 'Некорректное значение', 'login', profile.login) }, this.templator));
            this.childrens.push(new ProfileGroupTextComponent({ "root": new FormField('text', 'name', 'Имя', 'Некорректное значение', 'word', profile.name) }, this.templator));
            this.childrens.push(new ProfileGroupTextComponent({ "root": new FormField('text', 'secondName', 'Фамилия', 'Некорректное значение', 'word', profile.secondName) }, this.templator));
            this.childrens.push(new ProfileGroupTextComponent({ "root": new FormField('text', 'nickname', 'Имя в чате', 'Некорректное значение', 'word', profile.nickname) }, this.templator));
            this.childrens.push(new ProfileGroupTextComponent({ "root": new FormField('text', 'phone', 'Телефон', 'Некорректное значение', 'phone', profile.phone) }, this.templator));
            this.renderChildrensToSelector('.profile__body');
            this.afterRenderChildrens();
        }
    }

    public subscribe(): void {
        const showMd = this.getElement().querySelector('.profile__avatar-link');
        if (showMd) {
            showMd.addEventListener('click', () => { this.toggleModal() });
        }
        const hideMd = this.getElement().querySelector('.modal__button_bg_dark-green');
        if (hideMd) {
            hideMd.addEventListener('click', () => { this.changeAvatar() });
        }
        const inputFile = this.getElement().querySelector('.modal__file-upload__input');
        if (inputFile) {
            inputFile.addEventListener('change', (e) => { this.checkFile(e.target as HTMLInputElement) });
        }
        const backLink = this.getElement().querySelector('.profile__back');
        if (backLink) {
            backLink.addEventListener('click', () => { this.router.back() });
        }
        const changeProfileLink = this.getElement().querySelectorAll('.profile__footer .profile__group-link')[0];
        if (changeProfileLink) {
            changeProfileLink.addEventListener('click', () => { this.router.go('/change-profile') });
        }
        const changePasswordLink = this.getElement().querySelectorAll('.profile__footer .profile__group-link')[1];
        if (changePasswordLink) {
            changePasswordLink.addEventListener('click', () => { this.router.go('/change-password') });
        }
        const logoutLink = this.getElement().querySelectorAll('.profile__footer .profile__group-link')[2];
        if (logoutLink) {
            logoutLink.addEventListener('click', () => { this.logout() });
        }
    }

    public toggleModal(): void {
        const blackout = this.getElement().querySelector('.blackout');
        if (blackout) {
            if (blackout.classList.contains('blackout_state_show')) {
                blackout.classList.remove('blackout_state_show');
            } else {
                blackout.classList.add('blackout_state_show');
            }
        }
    }

    public changeAvatar(): void {
        const inputFile = this.getElement().querySelector('.modal__file-upload__input');
        if (inputFile) {
            if (this.checkFile(inputFile as HTMLInputElement)) {
                const avatarForm = this.getElement().querySelector('.modal__content')!;
                const avatar = this.getElement().querySelector('.modal__file-upload__input')! as HTMLInputElement;
                const file = avatar!.files![0];
                if (avatarForm && avatar) {
                    const formData = new FormData(avatarForm as HTMLFormElement);
                    formData.append('avatar', file, file.name);
                    this.profileService.chageAvatar(formData);
                }
            }
        }
        this.toggleModal();
    }

    public checkFile(target: HTMLInputElement): boolean {
        const label = this.getElement().querySelector(".modal__file-upload__label");
        const err = this.getElement().querySelector(".modal__text, .modal__text_bg_red");
        const file = target!.files![0];
        let valid = false;
        if (file !== undefined) {
            if (file.name.endsWith(".jpg") || file.name.endsWith(".png")) {
                // Максимальный допустимый размер 10 мб
                if (file.size < 1e7) {
                    label!.textContent = file.name;
                    valid = true;
                } else {
                    err!.textContent = "Превышен допустимый размер!";
                }
            } else {
                err!.textContent = "Неверный формат!";
            }
        } else {
            err!.textContent = "Ошибка чтения файла!";
        }

        if (valid) {
            err!.classList.add("modal__text_display_none");
        } else {
            err!.classList.remove("modal__text_display_none");
        }
        return valid;
    }

    public logout(): void {
        this.authService.logout().then(
            response => {
                if (response) {
                    this.router.go('/login');
                }
            }
        )
    }
}