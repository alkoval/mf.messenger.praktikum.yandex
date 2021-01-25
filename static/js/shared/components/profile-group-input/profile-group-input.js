import { BaseComponent } from '../../../core/base-component/base-component.js';
import { ProfileGroupInputTemplate } from './profile-group-input.template.js';
export class FormFieldComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ProfileGroupInputTemplate());
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}
//# sourceMappingURL=profile-group-input.js.map