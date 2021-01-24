import { BaseComponent } from '../../../core/base-component/base-component.js';
import { CardTemplate } from './card.template.js';
export class ButtonComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new CardTemplate());
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}
//# sourceMappingURL=card.js.map