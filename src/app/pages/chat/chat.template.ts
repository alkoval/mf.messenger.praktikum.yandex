import { ComponentTemplate } from '../../shared/interfaces/component-template.js';

export class ChatPageTemplate implements ComponentTemplate {
    private tag: string;
    private cssClass: string;

    constructor() {
        this.tag = 'div';
        this.cssClass = 'chat';
    }

    public getTag(): string {
        return this.tag;
    }

    public getCssClass(): string {
        return this.cssClass;
    }

    public getContent(): string {
        return `
            <div class="chat__sidebar">
                <div class="chat__toolbar chat__toolbar_content_right chat__toolbar_content_center">
                    <a class="chat__link" href="./profile.html">Профиль ></a>
                </div>
                <div class="chat__toolbar chat__toolbar_content_center">
                    <div class="single-field">
                        <input class="single-field__input fas" type="text" id="search" placeholder="&#xf002; Поиск"
                            required>
                    </div>
                </div>
                <div class="chat__dialogs"></div>
            </div>
            <div class="chat__content">
                <div class="intro">
                    <span>Выберите чат чтобы отправить сообщение</span>
                </div>
            </div>
        `;
    }
}