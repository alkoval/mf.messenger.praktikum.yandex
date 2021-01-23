import { BaseComponent } from '../../core/base-component/base-component.js';
import { IntroPageTemplate } from './intro.template.js';
export class IntroPageComponent extends BaseComponent {
    constructor(props, templator) {
        super("div", props, templator, new IntroPageTemplate().content);
    }
    render() {
        return this.templator.compile(this.template, this.getProps());
    }
    onClick() {
        console.log('click!');
    }
}
//# sourceMappingURL=intro.js.map