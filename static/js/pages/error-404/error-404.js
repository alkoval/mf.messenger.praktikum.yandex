import { BaseComponent } from '../../core/base-component/base-component.js';
import { Error404PageTemplate } from './error-404.template.js';
export class Error404PageComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new Error404PageTemplate());
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}
//# sourceMappingURL=error-404.js.map