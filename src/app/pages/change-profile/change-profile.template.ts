import { ComponentTemplate } from '../../shared/interfaces/component-template.js';

export class ChangeProfilePageTemplate implements ComponentTemplate {
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
                <span class="profile__back"><i class="fas fa-arrow-left"></i></span>
            </div>
            <div class="profile__content">
                <div class="profile__card">
                    <div class="profile__section">
                        <div class="profile__avatar-container">
                            <img class="profile__avatar" src="https://ya-praktikum.tech/{{avatar}}">
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