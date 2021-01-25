import { BaseComponent } from '../../core/base-component/base-component.js';
import { Templator } from '../../core/core.js';
import { PropsComponent } from '../../shared/interfaces/props-component.js';
import { ChatPageTemplate } from './chat.template.js';
import { ChatDialog } from '../../shared/models/chat-dialog.js';
import { ChatDialogComponent } from '../../shared/components/chat-dialog/chat-dialog.js';
import { ChatHistoryComponent } from '../../shared/components/chat-history/chat-history.js';

export class ChatPageComponent extends BaseComponent {
    private chatHistory: ChatHistoryComponent;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ChatPageTemplate());
        this.chatHistory = new ChatHistoryComponent({}, this.templator);
    }

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }

    public prerenderChildrens(): void {
        for (let item of this.getProps() as ChatDialog[]) {
            this.childrens.push(new ChatDialogComponent(item, this.templator));
        }

        this.renderChildrensToSelector('.chat__dialogs');
    }

    public subscribe(): void {
        const nodes = this.getElement().querySelectorAll('.chat__dialog');
        for (let item of nodes) {
            item.addEventListener('click', () => { this.getHistory(item as HTMLElement) });
        }
    }

    public getHistory(node: HTMLElement) {
        let idDialog = node.dataset.idDialog !== undefined ? parseInt(node.dataset.idDialog) : 0;
        if (idDialog !== 0) {
            const selectedDialog = (this.getProps() as ChatDialog[]).find(e => e.id === idDialog);
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