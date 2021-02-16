import { BaseComponent } from '../../../core/base-component/base-component.js';
import { ChatService } from '../../services/chat.service.js';
import { ChatDialogTemplate } from './chat-dialog.template.js';
export class ChatDialogComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ChatDialogTemplate());
        this.chatService = ChatService.getInstance();
    }
    subscribe() {
        this.getElement().addEventListener('click', () => { this.selected(this.getProps().root.id); });
    }
    setDataset() {
        let chatDialog = this.getProps().root;
        this.getElement().dataset['idDialog'] = chatDialog.id.toString();
    }
    selected(id) {
        this.chatService.selectDialogById(id);
    }
}
//# sourceMappingURL=chat-dialog.js.map