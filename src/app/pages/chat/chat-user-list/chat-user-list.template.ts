import { ComponentTemplate } from "../../../shared/shared.interfaces"

export class ChatUserListTemplate implements ComponentTemplate {
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
                    <span class="list__text" data-id='{{id}}'>{{name}} {{secondName}}</span>
                </li>
            {{/each}}
        `;
    }
}