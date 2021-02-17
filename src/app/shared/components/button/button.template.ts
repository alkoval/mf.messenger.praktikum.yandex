import { ComponentTemplate } from '../../interfaces/component-template'

export class ButtonTemplate implements ComponentTemplate {
    private tag: string;
    private cssClass: string;

    constructor() {
        this.tag = 'button';
        this.cssClass = 'card__button';
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