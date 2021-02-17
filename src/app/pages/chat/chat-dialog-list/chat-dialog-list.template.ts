import { ComponentTemplate } from '../../../shared/interfaces/component-template'

export class ChatDialogListTemplate implements ComponentTemplate {
    private tag: string;
    private cssClass: string;

    constructor() {
        this.tag = 'div';
        this.cssClass = 'chat__dialogs';
    }

    public getTag(): string {
        return this.tag;
    }

    public getCssClass(): string {
        return this.cssClass;
    }

    public getContent(): string {
        return ``;
    }
}