import { BaseComponent } from '../../../core/base-component/base-component.js';
import { NotifyTemplate } from './notify.template.js';
export class NotifyComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new NotifyTemplate());
    }
    subscribe() {
        const notify = this.getProps();
        setTimeout(this.hide.bind(this), notify.time);
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
    show() {
        console.log(this.getProps());
        this.getElement().style.display = 'block';
    }
    hide() {
        this.getElement().style.display = 'none';
    }
}
//# sourceMappingURL=notify.js.map