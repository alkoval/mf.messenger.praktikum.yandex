export class ProfileGroupInputTemplate {
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
            <input class="profile__input" type="{{type}}" placeholder="..." name="{{name}}" value="{{value}}">
        `;
    }
}
//# sourceMappingURL=profile-group-input.template.js.map