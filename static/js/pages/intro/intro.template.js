export class IntroPageTemplate {
    constructor() {
        this.content = '';
        this.init();
    }
    init() {
        this.content = `
            <ul class="list">
                {{#each this}}
                    <li class="list__item" onclick="this.onClick()">
                        <i class="{{icon}}"></i>
                        <a class="list__text" href='{{route}}'>{{text}}</a>
                    </li>
                {{/each}}
            </ul>
        `;
    }
}
//# sourceMappingURL=intro.template.js.map