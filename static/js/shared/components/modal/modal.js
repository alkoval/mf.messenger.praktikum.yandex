import { BaseComponent } from '../../../core/base-component/base-component.js';
import { ModalTemplate } from './modal.template.js';
export class ModalComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ModalTemplate());
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}
//# sourceMappingURL=modal.js.map