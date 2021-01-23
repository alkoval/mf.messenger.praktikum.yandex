import { PageTemplate } from '../../shared/interfaces/page-template.js';

export class IntroPageTemplate implements PageTemplate {
    public content: string;

    constructor() {
        this.content = this.getContent();
    }

    private getContent(): string {
        return `
            <ul class="list">
                {{#each this}}
                    <li class="list__item" onclick="onClick()">
                        <i class="{{icon}}"></i>
                        <a class="list__text" href='{{route}}'>{{text}}</a>
                    </li>
                {{/each}}
            </ul>
        `;
    }
}