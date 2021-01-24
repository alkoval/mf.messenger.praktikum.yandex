import { BaseComponent } from '../../../core/base-component/base-component.js';
import { ChatHistoryTemplate } from './chat-history.template.js';
export class ChatHistoryComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ChatHistoryTemplate());
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
    prerenderChildrens() {
        this.renderChildrens();
    }
    subscribe() { }
}
//# sourceMappingURL=chat-history.js.map