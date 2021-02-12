import { BaseComponent } from '../../core/base-component/base-component.js';
import { IntroService } from './intro.service.js';
import { IntroPageTemplate } from './intro.template.js';
import { Router } from '../../core/router/router.js';
export class IntroPageComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new IntroPageTemplate());
        this.introService = new IntroService();
        this.router = Router.getInstance();
        this.onInit();
    }
    onInit() {
        this.setProps(this.introService.getLinks());
    }
    subscribe() {
        for (let link of this.getElement().querySelectorAll('.list__item .list__text')) {
            const path = link.dataset.path;
            if (path) {
                link.addEventListener('click', () => {
                    this.router.go(path);
                });
            }
        }
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}
//# sourceMappingURL=intro.js.map