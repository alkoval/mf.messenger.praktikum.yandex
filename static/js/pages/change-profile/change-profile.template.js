export class ChangeProfilePageTemplate {
    constructor() {
        this.tag = 'div';
        this.cssClass = 'profile';
    }
    getTag() {
        return this.tag;
    }
    getCssClass() {
        return this.cssClass;
    }
    getContent() {
        return `
            <div class="blackout" id="mdFileUpload">
                <div class="modal modal_state_show">
                    <div class="modal__content">
                        <div class="modal__section">
                            <span class="modal__title">Загрузите файл</span>
                        </div>
                        <div class="modal__section">
                            <div class="modal__file-upload">
                                <label for="fileUpload" class="modal__file-upload__label">
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
                    </div>
                </div>
            </div>
            <div class="profile__sidebar">
                <a class="profile__back" href="./index.html"><i class="fas fa-arrow-left"></i></a>
            </div>
            <div class="profile__content">
                <div class="profile__card">
                    <div class="profile__section">
                        <div class="profile__avatar-container">
                            <img class="profile__avatar" src="assets/images/{{avatar}}" alt="">
                            <div class="profile__avatar-link">
                                <span>Поменять<br>аватар</span>
                            </div>
                        </div>
                        <span class="profile__nickname">{{nickname}}</span>
                    </div>
                    <ul class="profile__section profile__body"></ul>
                    <div class="profile__section profile__footer">
                        <button class="profile__button profile__button_bg_dark-green" type="button">Сохранить</button>
                    </div>
                </div>
            </div>
        `;
    }
}
//# sourceMappingURL=change-profile.template.js.map