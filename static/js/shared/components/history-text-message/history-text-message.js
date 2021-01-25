import { BaseComponent } from '../../../core/base-component/base-component.js';
import { HistoryTextMessageTemplate } from './history-text-message.template.js';
export class HistoryTextMessageComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new HistoryTextMessageTemplate());
    }
    render() {
        console.log(this.getProps());
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}
//# sourceMappingURL=history-text-message.js.map