import { BaseComponent } from '../../core/base-component/base-component.js';
import { ChatPageTemplate } from './chat.template.js';
import { ChatHistoryComponent } from './chat-history/chat-history.js';
import { Router } from '../../core/router/router.js';
import { ChatService } from '../services/chat.service.js';
import { ProfileService, PROFILE_EVENTS } from '../services/profile.service.js';
import { ModalNewDialogComponent } from './modal-new-dialog/modal-new-dialog.js';
import { ModalAddUserComponent } from './modal-add-user/modal-add-user.js';
import { ModalDelUserComponent } from './modal-del-user/modal-del-user.js';
import { ChatDialogListComponent } from './chat-dialog-list/chat-dialog-list.js';
import { FormField } from '../../shared/shared.models.js';
export class ChatPageComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ChatPageTemplate());
        this.profileService = ProfileService.getInstance();
        this.chatService = ChatService.getInstance();
        this.router = Router.getInstance();
        this.onInit();
    }
    onInit() {
        this.setProps({
            'mdAddUser': new ModalAddUserComponent({ 'root': '', 'field': new FormField('text', 'userName', 'Логин пользователя', '', '') }, this.templator),
            'mdDelUser': new ModalDelUserComponent({ 'root': '' }, this.templator),
            'mdNewDialog': new ModalNewDialogComponent({ 'root': '', 'field': new FormField('text', 'dialogName', 'Имя диалога', 'Некорректное значение', 'word') }, this.templator),
            'chatDialogsList': new ChatDialogListComponent({ 'root': '', 'dialogs': [] }, this.templator),
            'chatHistory': new ChatHistoryComponent({}, this.templator)
        });
        this.profileService.subscribe().on(PROFILE_EVENTS.PROFILE_UPDATE, this.updateProfile.bind(this));
        this.updateProfile(this.profileService.getProfile());
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps().root);
    }
    prerenderChildrens() {
        if (this.getProps().mdAddUser) {
            const modals = [this.getProps().mdAddUser, this.getProps().mdDelUser, this.getProps().mdNewDialog];
            this.renderToRoot(modals);
            this.renderToSelector([this.getProps().chatDialogsList], '.chat__sidebar');
            this.getProps().chatHistory.setProps({ 'root': null, 'mdAddUser': this.getProps().mdAddUser, 'mdDelUser': this.getProps().mdDelUser });
            this.renderToSelector([this.getProps().chatHistory], '.chat__content');
            this.afterRenderChildrens();
        }
    }
    subscribe() {
        const mdNewDialog = this.getElement().querySelectorAll('.chat__toolbar .chat__link')[0];
        if (mdNewDialog) {
            mdNewDialog.addEventListener('click', () => { this.showMdAddNewDialog(); });
        }
        const profileLink = this.getElement().querySelectorAll('.chat__toolbar .chat__link')[1];
        if (profileLink) {
            profileLink.addEventListener('click', () => { this.router.go('/profile'); });
        }
    }
    updateProfile(profile) {
        if (profile !== null) {
            this.setProps({ 'profile': profile });
            this.chatService.loadDialogs();
        }
    }
    showMdAddNewDialog() {
        this.getProps().mdNewDialog.toggle();
    }
}
//# sourceMappingURL=chat.js.map