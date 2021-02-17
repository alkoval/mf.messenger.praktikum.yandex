import { ComponentTemplate } from '../../interfaces/component-template'

export class ProfileGroupTextTemplate implements ComponentTemplate {
    private tag: string;
    private cssClass: string;

    constructor() {
        this.tag = 'li';
        this.cssClass = 'profile__group';
    }

    public getTag(): string {
        return this.tag;
    }

    public getCssClass(): string {
        return this.cssClass;
    }

    public getContent(): string {
        return `
                <span class="profile__group-text">{{label}}</span>
                <span class="profile__group-text profile__group-text_color_white">{{value}}</span>
        `;
    }
}