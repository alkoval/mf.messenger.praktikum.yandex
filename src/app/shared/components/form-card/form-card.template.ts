import { ComponentTemplate } from '../../interfaces/component-template.js';

export class FormCardTemplate implements ComponentTemplate {
    private tag: string;
    private cssClass: string;

    constructor() {
        this.tag = 'from';
        this.cssClass = 'card';
    }

    public getTag(): string {
        return this.tag;
    }

    public getCssClass(): string {
        return this.cssClass;
    }

    public getContent(): string {
        return `
            <div class="card__header">
                <div class="card__title">{{title}}</div>
            </div>
            <div class="card__body"></div>
            <div class="card__footer">
                <button class="card__button card__button_bg_dark-green" type="button">{{btnText}}</button>
                <a class="card__link" href="{{link}}">{{linkText}}</a>
            </div>
        `;
    }
}