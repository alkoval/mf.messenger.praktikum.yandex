import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Router } from '../../../core/router/router.js';
import { TextLinkTemplate } from './text-link.template.js';
export class TextLinkComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new TextLinkTemplate());
        this.router = Router.getInstance();
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
    subscribe() {
        const link = this.getProps();
        const elem = this.getElement();
        elem.addEventListener('click', () => { this.router.go(link.path); });
    }
}
//# sourceMappingURL=text-link.js.map