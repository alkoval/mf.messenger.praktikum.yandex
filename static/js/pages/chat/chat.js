import { BaseComponent } from '../../core/base-component/base-component.js';
import { ChatPageTemplate } from './chat.template.js';
import FormValidationService from '../../core/services/form-validation.service.js';
import { ChatDialogComponent } from '../../shared/components/chat-dialog/chat-dialog.js';
export class ChatPageComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ChatPageTemplate());
        this.formValidationService = new FormValidationService();
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
    prerenderChildrens() {
        for (let item of this.getProps()) {
            this.childrens.push(new ChatDialogComponent(item, this.templator));
        }
        this.renderChildrensToSelector('.chat__dialogs');
    }
    subscribe() {
        const nodes = this.getElement().querySelectorAll('.chat__dialog');
        for (let node of nodes) {
            node.addEventListener('click', () => { this.getHistory(); });
        }
    }
    getHistory() {
        console.log(this);
    }
}
//# sourceMappingURL=chat.js.map