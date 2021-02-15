import { BaseComponent } from '../../core/base-component/base-component.js';
import { Templator } from '../../core/core.js';
import { OnInit, PropsComponent } from '../../shared/shared.interfaces.js';
import { ChatPageTemplate } from './chat.template.js';
import { ChatDialog } from '../../shared/shared.models.js';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.js';
import { ChatHistoryComponent } from './chat-history/chat-history.js';
import { ProfileService } from '../services/profile.service.js';
import { Router } from '../../core/router/router.js';

export class ChatPageComponent extends BaseComponent implements OnInit {
    private chatHistory: ChatHistoryComponent;
    private profileService: ProfileService;
    private router: Router;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ChatPageTemplate());
        this.chatHistory = new ChatHistoryComponent({}, this.templator);
        this.profileService = new ProfileService();
        this.router = Router.getInstance();
    }

    public onInit(): void {

    }

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }

    public prerenderChildrens(): void {
        //console.log(this.getProps())
        //const dialogs = this.getProps() as ChatDialog[];
        //console.log(dialogs)
        /*for (let item of this.getProps() as ChatDialog[]) {
            this.childrens.push(new ChatDialogComponent(item, this.templator));
        }

        this.renderChildrensToSelector('.chat__dialogs');*/
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