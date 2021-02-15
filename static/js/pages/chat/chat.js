import { BaseComponent } from '../../core/base-component/base-component.js';
import { ChatPageTemplate } from './chat.template.js';
import { ChatHistoryComponent } from './chat-history/chat-history.js';
import { ProfileService } from '../services/profile.service.js';
import { Router } from '../../core/router/router.js';
export class ChatPageComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ChatPageTemplate());
        this.chatHistory = new ChatHistoryComponent({}, this.templator);
        this.profileService = new ProfileService();
        this.router = Router.getInstance();
    }
    onInit() {
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
    prerenderChildrens() {
    }
    subscribe() {
        const nodes = this.getElement().querySelectorAll('.chat__dialog');
        for (let item of nodes) {
            item.addEventListener('click', () => { this.getHistory(item); });
        }
    }
    getHistory(node) {
        let idDialog = node.dataset.idDialog !== undefined ? parseInt(node.dataset.idDialog) : 0;
        if (idDialog !== 0) {
            const selectedDialog = this.getProps().find(e => e.id === idDialog);
            if (selectedDialog !== undefined) {
                const chatContent = this.getElement().querySelector('.chat__content');
                if (chatContent !== null) {
                    chatContent.innerHTML = '';
                    this.chatHistory.setProps(selectedDialog);
                    chatContent.appendChild(this.chatHistory.getContent());
                }
            }
        }
    }
}
//# sourceMappingURL=chat.js.map