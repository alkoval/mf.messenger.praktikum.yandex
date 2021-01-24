import { BaseComponent } from '../../../core/base-component/base-component.js';
import { ChatDialogTemplate } from './chat-dialog.template.js';
export class ChatDialogComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ChatDialogTemplate());
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
    prerenderChildrens() {
        this.renderChildrens();
    }
    subscribe() { }
}
//# sourceMappingURL=chat-dialog.js.map