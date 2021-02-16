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
                    <span class="chat__link"><i class="fas fa-comment-alt"></i></span>
                    <span class="chat__link"><i class="fas fa-id-card"></i></span>
                </div>
                <div class="chat__toolbar chat__toolbar_content_center">
                    <div class="single-field">
                        <input class="single-field__input fas" type="text" id="search" placeholder="&#xf002; Поиск"
                            required>
                    </div>
                </div>
            </div>
            <div class="chat__content"></div>           
        `;
    }
}