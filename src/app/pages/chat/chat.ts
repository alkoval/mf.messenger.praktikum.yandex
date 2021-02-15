import { BaseComponent } from '../../core/base-component/base-component.js';
import { Templator } from '../../core/core.js';
import { OnInit, PropsComponent } from '../../shared/shared.interfaces.js';
import { ChatPageTemplate } from './chat.template.js';
import { ChatDialog, FormField, Profile } from '../../shared/shared.models.js';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.js';
import { ChatHistoryComponent } from './chat-history/chat-history.js';
import { Router } from '../../core/router/router.js';
import { ChatService, CHAT_EVENTS } from '../services/chat.service.js';
import { ProfileService, PROFILE_EVENTS } from '../services/profile.service.js';
import { ModalNewDialogComponent } from './modal-new-dialog/modal-new-dialog.js';

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

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps().root);
    }

    public prerenderChildrens(): void {
        const mdNewDialog = new ModalNewDialogComponent({ 'root': '', 'field': new FormField('text', 'dialogName', 'Имя диалога', 'Некорректное значение', 'word') }, this.templator);
        this.renderToRoot([mdNewDialog]);
        this.childrens.push(mdNewDialog);

        const dialogs = [];
        if (this.getProps().dialogs) {
            for (let item of this.getProps().dialogs) {
                dialogs.push(new ChatDialogComponent({ 'root': item }, this.templator));
            }
        }
        this.renderToSelector(dialogs, '.chat__dialogs');

        this.afterRenderChildrens();
    }

    public subscribe(): void {
        const mdAddUser = this.getElement().querySelectorAll('.chat__toolbar .chat__link')[0];
        if (mdAddUser) {
            mdAddUser.addEventListener('click', () => { this.toggle() });
        }
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

    public toggle(): void {
        const blackout = this.getElement().querySelector('.blackout');
        if (blackout) {
            if (blackout.classList.contains('blackout_state_show')) {
                blackout.classList.remove('blackout_state_show');
            } else {
                blackout.classList.add('blackout_state_show');
            }
        }
    }
}