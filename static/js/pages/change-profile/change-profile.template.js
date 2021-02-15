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
            <div class="profile__sidebar">
                <span class="profile__back"><i class="fas fa-arrow-left"></i></span>
            </div>
            <div class="profile__content">
                <div class="profile__card">
                    <div class="profile__section">
                        <div class="profile__avatar-container">
                            <img class="profile__avatar" src="https://ya-praktikum.tech/{{avatar}}" alt="">
                        </div>
                        <span class="profile__nickname">{{nickname}}</span>
                    </div>
                    <ul class="profile__section profile__body"></ul>
                    <div class="profile__section profile__footer"></div>
                </div>
            </div>
        `;
    }
}
//# sourceMappingURL=change-profile.template.js.map