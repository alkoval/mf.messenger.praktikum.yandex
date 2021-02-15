import { BaseComponent } from '../../../core/base-component/base-component.js';
import { NotifyTemplate } from './notify.template.js';
export class NotifyComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new NotifyTemplate());
    }
    subscribe() {
        const notify = this.getProps().root;
        setTimeout(this.hide.bind(this), notify.time);
    }
    show() {
        this.getElement().style.display = 'block';
    }
    hide() {
        this.getElement().remove();
    }
}
//# sourceMappingURL=notify.js.map