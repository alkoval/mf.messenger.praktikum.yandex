import { ComponentTemplate } from '../../interfaces/component-template.js';

export class TextLinkTemplate implements ComponentTemplate {
    private tag: string;
    private cssClass: string;

    constructor() {
        this.tag = 'span';
        this.cssClass = 'text-link';
    }

    public getTag(): string {
        return this.tag;
    }

    public getCssClass(): string {
        return this.cssClass;
    }

    public getContent(): string {
        return `
            {{text}}
        `;
    }
}