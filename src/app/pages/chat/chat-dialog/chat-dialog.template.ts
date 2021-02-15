import { ComponentTemplate } from '../../../shared/interfaces/component-template.js';

export class ChatDialogTemplate implements ComponentTemplate {
    private tag: string;
    private cssClass: string;

    constructor() {
        this.tag = 'div';
        this.cssClass = 'chat__dialog';
    }

    public getTag(): string {
        return this.tag;
    }

    public getCssClass(): string {
        return this.cssClass;
    }

    public getContent(): string {
        return `
            <div class="chat__avatar-column">
                <img class="chat__avatar" src="{{avatar}}">
            </div>
            <div class="chat__text-column">
                <span class="chat__title">{{title}}</span>
                <span class="chat__message-preview">{{message}}</span>
            </div>
            <div class="chat__property-column">
                <time class="chat__time">{{shortTime}}</time>
                {{#if unread}}
                    <span class="chat__count-unread">{{unread}}</span>
                {{/if}}                
            </div>
        `;
    }
}