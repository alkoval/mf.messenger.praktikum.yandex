import { BaseComponent } from '../../core/base-component/base-component.js';
import { Templator } from '../../core/core.js';
import { OnInit, PropsComponent } from '../../shared/shared.interfaces.js';
import { ChatPageTemplate } from './chat.template.js';
import { ChatDialog, Profile } from '../../shared/shared.models.js';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.js';
import { ChatHistoryComponent } from './chat-history/chat-history.js';
import { Router } from '../../core/router/router.js';
import { ChatService } from '../services/chat.service.js';
import { Store, STORE_EVENTS } from '../../core/store/store.js';

export class ChatPageComponent extends BaseComponent implements OnInit {
    private chatHistory: ChatHistoryComponent;
    private chatService: ChatService;
    private router: Router;
    private store: Store;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ChatPageTemplate());
        this.chatHistory = new ChatHistoryComponent({}, this.templator);
        this.chatService = new ChatService();
        this.router = Router.getInstance();
        this.store = Store.getInstance();
        this.onInit();
    }

    public onInit(): void {
        this.store.subscribe().on(STORE_EVENTS.PROFILE_UPDATE, this.updateProfile.bind(this));
        const profile = this.store.getProfile();
        if (profile !== null) {
            this.setProps({ "profile": profile });
            this.loadDialogs();
        }
    }

    public prerenderChildrens(): void {
        if (this.getProps().dialogs) {
            for (let item of this.getProps().dialogs as ChatDialog[]) {
                this.childrens.push(new ChatDialogComponent({ "root": item }, this.templator));
            }
        }
        this.renderChildrensToSelector('.chat__dialogs');
        this.afterRenderChildrens();
    }

    public subscribe(): void {
        const mdAddUser = this.getElement().querySelectorAll('.chat__dialog, .chat__link')[0];
        if (mdAddUser) {
            mdAddUser.addEventListener('click', () => { this.toggleModal() });
        }
        const closeMdAddUser = this.getElement().querySelectorAll('.chat__dialog, .modal__close')[0];
        if (closeMdAddUser) {
            closeMdAddUser.addEventListener('click', () => { this.toggleModal() });
        }
        const profileLink = this.getElement().querySelectorAll('.chat__dialog, .chat__link')[1];
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

    public updateProfile(profile: Profile): void {
        if (profile !== null) {
            this.setProps({ "profile": profile });
            this.loadDialogs();
        }
    }

    public loadDialogs(): void {
        this.chatService.getDialogs().then(
            response => {
                this.setProps({ "dialogs": response });
            }
        )
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

    public toggleModal(): void {
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