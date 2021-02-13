import { ComponentTemplate } from '../../interfaces/component-template.js';

export class NotifyTemplate implements ComponentTemplate {
    private tag: string;
    private cssClass: string;

    constructor() {
        this.tag = 'div';
        this.cssClass = 'notify';
    }

    public getTag(): string {
        return this.tag;
    }

    public getCssClass(): string {
        return this.cssClass;
    }

    public getContent(): string {
        return `
            {{message}}
        `;
    }
}