export class ChangePasswordPageTemplate {
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
                    <ul class="profile__section profile__body"></ul>
                    <div class="profile__section profile__footer"></div>
                </div>
            </div>
        `;
    }
}
//# sourceMappingURL=change-password.template.js.map