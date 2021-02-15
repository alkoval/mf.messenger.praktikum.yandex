import { BaseComponent } from '../../../core/base-component/base-component.js';
import { ModalTemplate } from './modal.template.js';
export class ModalComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ModalTemplate());
    }
}
//# sourceMappingURL=modal.js.map