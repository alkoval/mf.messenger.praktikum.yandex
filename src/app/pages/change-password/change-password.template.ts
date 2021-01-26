import { ComponentTemplate } from '../../shared/interfaces/component-template.js';

export class ChangePasswordPageTemplate implements ComponentTemplate {
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
            <div class="profile__sidebar">
                <a class="profile__back" href="./index.html"><i class="fas fa-arrow-left"></i></a>
            </div>
            <div class="profile__content">
                <div class="profile__card">
                    <ul class="profile__section profile__body"></ul>
                    <div class="profile__section profile__footer">
                        <button class="profile__button profile__button_bg_dark-green" type="button">Сохранить</button>
                    </div>
                </div>
            </div>
        `;
    }
}