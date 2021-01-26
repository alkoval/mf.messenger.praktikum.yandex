import { ComponentTemplate } from '../../../shared/interfaces/component-template.js';

export class HistoryImgMessageTemplate implements ComponentTemplate {
    private tag: string;
    private cssClass: string;

    constructor() {
        this.tag = 'div';
        this.cssClass = 'history__message history__message_type_image';
    }

    public getTag(): string {
        return this.tag;
    }

    public getCssClass(): string {
        return this.cssClass;
    }

    public getContent(): string {
        return `
            <img src="{{src}}" alt="">
            <div class="history__time history__time_bg_gray history__time_position_right-end">
                <time>{{shortTime}}</time>
            </div>
        `;
    }
}