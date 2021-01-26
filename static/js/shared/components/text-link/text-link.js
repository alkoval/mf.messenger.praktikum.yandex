import { BaseComponent } from '../../../core/base-component/base-component.js';
import { TextLinkTemplate } from './text-link.template.js';
export class TextLinkComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new TextLinkTemplate());
    }
    render() {
        const link = this.getProps();
        const elem = this.getElement();
        elem.href = link.url;
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}
//# sourceMappingURL=text-link.js.map