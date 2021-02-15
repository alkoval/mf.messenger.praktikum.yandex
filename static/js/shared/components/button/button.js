import { BaseComponent } from '../../../core/base-component/base-component.js';
import { ButtonTemplate } from './button.template.js';
export class ButtonComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ButtonTemplate());
    }
    render() {
        const btn = this.getProps().root;
        this.getElement().classList.add(btn.cssClass);
        return this.templator.compile(this.template.getContent(), this.getProps().root);
    }
}
//# sourceMappingURL=button.js.map