import { ComponentTemplate } from '../../interfaces/component-template.js';

export class ProfileGroupInputTemplate implements ComponentTemplate {
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
            <input class="profile__input" type="{{type}}" placeholder="..." name="{{name}}" value="{{value}}">
        `;
    }
}