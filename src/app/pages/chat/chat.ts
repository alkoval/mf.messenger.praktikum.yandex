import { BaseComponent } from '../../core/base-component/base-component.js';
import { Templator } from '../../core/core.js';
import { OnInit, PropsComponent } from '../../shared/shared.interfaces.js';
import { ChatPageTemplate } from './chat.template.js';
import { ChatDialog, Profile } from '../../shared/shared.models.js';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.js';
import { ChatHistoryComponent } from './chat-history/chat-history.js';
import { Router } from '../../core/router/router.js';
import { ChatService, CHAT_EVENTS } from '../services/chat.service.js';
import { ProfileService, PROFILE_EVENTS } from '../services/profile.service.js';

export class ChatPageComponent extends BaseComponent implements OnInit {
    private chatHistory: ChatHistoryComponent;
    private profileService: ProfileService;
    private chatService: ChatService;
    private router: Router;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ChatPageTemplate());
        this.chatHistory = new ChatHistoryComponent({}, this.templator);
        this.profileService = ProfileService.getInstance();
        this.chatService = ChatService.getInstance();
        this.router = Router.getInstance();
        this.onInit();
    }

    public onInit(): void {
        this.profileService.subscribe().on(PROFILE_EVENTS.PROFILE_UPDATE, this.updateProfile.bind(this));
        this.chatService.subscribe().on(CHAT_EVENTS.DIALOGS_RELOAD, this.reloadDialogs.bind(this));
        this.updateProfile(this.profileService.getProfile());
    }

    public prerenderChildrens(): void {
        if (this.getProps().dialogs) {
            for (let item of this.getProps().dialogs) {
                this.childrens.push(new ChatDialogComponent({ 'root': item }, this.templator));
            }
        }
        this.renderChildrensToSelector('.chat__dialogs');
        this.afterRenderChildrens();
    }

    public subscribe(): void {
        const profileLink = this.getElement().querySelectorAll('.chat__toolbar .chat__link')[1];
        if (profileLink) {
            profileLink.addEventListener('click', () => { this.router.go('/profile') });
        }
    }

    public subscribeOnChildrens(): void {
        const nodes = this.getElement().querySelectorAll('.chat__dialog');
        for (let item of nodes) {
            item.addEventListener('click', () => { this.getHistory(item as HTMLElement) });
        }
    }

    public updateProfile(profile: Profile | null): void {
        if (profile !== null) {
            this.setProps({ 'profile': profile });
            this.chatService.loadDialogs();
        }
    }

    public reloadDialogs(dialogs: ChatDialog[]): void {
        this.setProps({ 'dialogs': dialogs });
    }

    public getHistory(node: HTMLElement) {
        let idDialog = node.dataset.idDialog !== undefined ? parseInt(node.dataset.idDialog) : 0;
        if (idDialog !== 0) {
            const selectedDialog = (this.getProps().dialogs as ChatDialog[]).find(e => e.id === idDialog);
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