import { BaseComponent } from '../../../core/base-component/base-component.js';
import { FormCardTemplate } from './form-card.template.js';
import { FormFieldComponent } from '../form-field/form-field.js';
export class FormCardComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new FormCardTemplate());
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
    prerenderChildrens() {
        for (let item of this.getProps().fields) {
            this.childrens.push(new FormFieldComponent(item, this.templator));
        }
        this.renderChildrensToSelector('.card__body');
    }
}
//# sourceMappingURL=form-card.js.map