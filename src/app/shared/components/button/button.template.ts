import { ComponentTemplate } from '../../interfaces/component-template.js';

export class ButtonTemplate implements ComponentTemplate {
    private tag: string;
    private cssClass: string;

    constructor() {
        this.tag = 'ul';
        this.cssClass = 'list';
    }

    public getTag(): string {
        return this.tag;
    }

    public getCssClass(): string {
        return this.cssClass;
    }

    public getContent(): string {
        return `
            {{#each this}}
                <li class="list__item">
                    <i class="{{icon}}"></i>
                    <a class="list__text" href='{{route}}'>{{text}}</a>
                </li>
            {{/each}}
        `;
    }
}