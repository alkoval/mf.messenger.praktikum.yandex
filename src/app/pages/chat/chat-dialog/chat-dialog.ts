import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { PropsComponent } from '../../../shared/interfaces/props-component.js';
import { ChatDialog } from '../../../shared/models/chat-dialog.js';
import { ChatService } from '../../services/chat.service.js';
import { ChatDialogTemplate } from './chat-dialog.template.js';

export class ChatDialogComponent extends BaseComponent {
    private chatService: ChatService;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ChatDialogTemplate());
        this.chatService = ChatService.getInstance();
    }

    public subscribe(): void {
        this.getElement().addEventListener('click', () => { this.selected(this.getProps().root.id) });
    }

    public setDataset(): void {
        let chatDialog = this.getProps().root as ChatDialog;
        this.getElement().dataset['idDialog'] = chatDialog.id.toString();
    }

    public selected(id: number): void {
        this.chatService.selectDialogById(id);
    }
}