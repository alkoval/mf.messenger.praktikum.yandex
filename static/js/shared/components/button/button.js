import { BaseComponent } from '../../../core/base-component/base-component.js';
import { ButtonTemplate } from './button.template.js';
export class ButtonComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ButtonTemplate());
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}
//# sourceMappingURL=button.js.map