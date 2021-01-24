export class ButtonTemplate {
    constructor() {
        this.tag = 'ul';
        this.cssClass = 'list';
    }
    getTag() {
        return this.tag;
    }
    getCssClass() {
        return this.cssClass;
    }
    getContent() {
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
//# sourceMappingURL=button.template.js.map