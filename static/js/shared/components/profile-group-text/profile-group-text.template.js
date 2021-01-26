export class ProfileGroupTextTemplate {
    constructor() {
        this.tag = 'li';
        this.cssClass = 'profile__group';
    }
    getTag() {
        return this.tag;
    }
    getCssClass() {
        return this.cssClass;
    }
    getContent() {
        return `
                <span class="profile__group-text">{{label}}</span>
                <span class="profile__group-text profile__group-text_color_white">{{value}}</span>
        `;
    }
}
//# sourceMappingURL=profile-group-text.template.js.map