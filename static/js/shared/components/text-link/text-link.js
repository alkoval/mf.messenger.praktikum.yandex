import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Router } from '../../../core/router/router.js';
import { TextLinkTemplate } from './text-link.template.js';
export class TextLinkComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new TextLinkTemplate());
        this.router = Router.getInstance();
    }
    subscribe() {
        const link = this.getProps().root;
        const elem = this.getElement();
        elem.addEventListener('click', () => { this.router.go(link.path); });
    }
}
//# sourceMappingURL=text-link.js.map