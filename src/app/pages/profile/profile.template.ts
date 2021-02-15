import { ComponentTemplate } from '../../shared/interfaces/component-template.js';

export class ProfilePageTemplate implements ComponentTemplate {
    private tag: string;
    private cssClass: string;

    constructor() {
        this.tag = 'div';
        this.cssClass = 'profile';
    }

    public getTag(): string {
        return this.tag;
    }

    public getCssClass(): string {
        return this.cssClass;
    }

    public getContent(): string {
        return `
            <div class="blackout" id="mdFileUpload">
                <div class="modal modal_state_show">
                    <form class="modal__content">
                        <div class="modal__section">
                            <span class="modal__title">Загрузите файл</span>
                        </div>
                        <div class="modal__section">
                            <div class="modal__file-upload">
                                <label for="fileUpload" class="modal__file-upload__label text-link">
                                    Выбрать файл на компьютере
                                </label>
                                <input class="modal__file-upload__input" id="fileUpload" type="file"/>
                            </div>
                        </div>
                        <div class="modal__section">
                            <button class="modal__button modal__button_bg_dark-green" type="button">Поменять</button>
                        </div>
                        <div class="modal__section">
                            <span class="modal__text modal__text_bg_red modal__text_display_none"></span>
                        </div>
                    </form>
                </div>
            </div>
            <div class="profile__sidebar">
                <span class="profile__back"><i class="fas fa-arrow-left"></i></span>
            </div>
            <div class="profile__content">
                <div class="profile__card">
                    <div class="profile__section">
                        <div class="profile__avatar-container">
                            <img class="profile__avatar" src="https://ya-praktikum.tech/{{avatar}}" alt="">
                            <div class="profile__avatar-link">
                                <span>Поменять<br>аватар</span>
                            </div>
                        </div>
                        <span class="profile__nickname">{{nickname}}</span>
                    </div>
                    <ul class="profile__section profile__body">
                    </ul>
                    <ul class="profile__section profile__footer">
                        <li class="profile__group">
                            <span class="profile__group-text profile__group-text_color_dark-green profile__group-link">Изменить данные</span>
                        </li>
                        <li class="profile__group">
                            <span class="profile__group-text profile__group-text_color_dark-green profile__group-link">Изменить пароль</span>
                        </li>
                        <li class="profile__group profile__group_border_null">
                            <span class="profile__group-text profile__group-text_color_red profile__group-link">Выйти</span>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    }
}