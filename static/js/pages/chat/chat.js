import { BaseComponent } from '../../core/base-component/base-component.js';
import { ChatPageTemplate } from './chat.template.js';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.js';
import { ChatHistoryComponent } from './chat-history/chat-history.js';
import { Router } from '../../core/router/router.js';
import { ChatService, CHAT_EVENTS } from '../services/chat.service.js';
import { ProfileService, PROFILE_EVENTS } from '../services/profile.service.js';
export class ChatPageComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ChatPageTemplate());
        this.chatHistory = new ChatHistoryComponent({}, this.templator);
        this.profileService = ProfileService.getInstance();
        this.chatService = ChatService.getInstance();
        this.router = Router.getInstance();
        this.onInit();
    }
    onInit() {
        this.profileService.subscribe().on(PROFILE_EVENTS.PROFILE_UPDATE, this.updateProfile.bind(this));
        this.chatService.subscribe().on(CHAT_EVENTS.DIALOGS_RELOAD, this.reloadDialogs.bind(this));
        this.updateProfile(this.profileService.getProfile());
    }
    prerenderChildrens() {
        if (this.getProps().dialogs) {
            for (let item of this.getProps().dialogs) {
                this.childrens.push(new ChatDialogComponent({ 'root': item }, this.templator));
            }
        }
        this.renderChildrensToSelector('.chat__dialogs');
        this.afterRenderChildrens();
    }
    subscribe() {
        const profileLink = this.getElement().querySelectorAll('.chat__toolbar .chat__link')[1];
        if (profileLink) {
            profileLink.addEventListener('click', () => { this.router.go('/profile'); });
        }
    }
    subscribeOnChildrens() {
        const nodes = this.getElement().querySelectorAll('.chat__dialog');
        for (let item of nodes) {
            item.addEventListener('click', () => { this.getHistory(item); });
        }
    }
    updateProfile(profile) {
        if (profile !== null) {
            this.setProps({ 'profile': profile });
            this.chatService.loadDialogs();
        }
    }
    reloadDialogs(dialogs) {
        this.setProps({ 'dialogs': dialogs });
    }
    getHistory(node) {
        let idDialog = node.dataset.idDialog !== undefined ? parseInt(node.dataset.idDialog) : 0;
        if (idDialog !== 0) {
            const selectedDialog = this.getProps().dialogs.find(e => e.id === idDialog);
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