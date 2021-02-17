import { BaseComponent } from '../../core/base-component/base-component'
import { Templator } from '../../core/core'
import { OnInit, PropsComponent } from '../../shared/shared.interfaces'
import { ChatPageTemplate } from './chat.template'
import { ChatHistoryComponent } from './chat-history/chat-history'
import { Router } from '../../core/router/router'
import { ChatService } from '../services/chat.service'
import { ProfileService, PROFILE_EVENTS } from '../services/profile.service'
import { ModalNewDialogComponent } from './modal-new-dialog/modal-new-dialog'
import { ModalAddUserComponent } from './modal-add-user/modal-add-user'
import { ModalDelUserComponent } from './modal-del-user/modal-del-user'
import { ChatDialogListComponent } from './chat-dialog-list/chat-dialog-list'
import { FormField, Profile } from '../../shared/shared.models'

export class ChatPageComponent extends BaseComponent implements OnInit {
    private profileService: ProfileService;
    private chatService: ChatService;
    private router: Router;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ChatPageTemplate());
        this.profileService = ProfileService.getInstance();
        this.chatService = ChatService.getInstance();
        this.router = Router.getInstance();
        this.onInit();
    }

    public onInit(): void {
        this.setProps({
            'mdAddUser': new ModalAddUserComponent({ 'root': '', 'field': new FormField('text', 'userName', 'Логин пользователя', '', '') }, this.templator),
            'mdDelUser': new ModalDelUserComponent({ 'root': '' }, this.templator),
            'mdNewDialog': new ModalNewDialogComponent({ 'root': '', 'field': new FormField('text', 'dialogName', 'Имя диалога', 'Некорректное значение', 'word') }, this.templator),
            'chatDialogsList': new ChatDialogListComponent({ 'root': '', 'dialogs': [] }, this.templator),
            'chatHistory': new ChatHistoryComponent({}, this.templator)
        })

        this.profileService.subscribe().on(PROFILE_EVENTS.PROFILE_UPDATE, this.updateProfile.bind(this));
        this.updateProfile(this.profileService.getProfile());
    }

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps().root);
    }

    public prerenderChildrens(): void {
        if (this.getProps().mdAddUser) {
            const modals = [this.getProps().mdAddUser, this.getProps().mdDelUser, this.getProps().mdNewDialog];
            this.renderToRoot(modals);

            this.renderToSelector([this.getProps().chatDialogsList], '.chat__sidebar');

            this.getProps().chatHistory.setProps({ 'root': null, 'mdAddUser': this.getProps().mdAddUser, 'mdDelUser': this.getProps().mdDelUser });
            this.renderToSelector([this.getProps().chatHistory], '.chat__content');

            this.afterRenderChildrens();
        }
    }

    public subscribe(): void {
        const mdNewDialog = this.getElement().querySelectorAll('.chat__toolbar .chat__link')[0];
        if (mdNewDialog) {
            mdNewDialog.addEventListener('click', () => { this.showMdAddNewDialog() });
        }
        const profileLink = this.getElement().querySelectorAll('.chat__toolbar .chat__link')[1];
        if (profileLink) {
            profileLink.addEventListener('click', () => { this.router.go('/profile') });
        }
        const filter = this.getElement().querySelector('.chat__toolbar .single-field__input');
        if (filter) {
            filter.addEventListener('keyup', (e) => { this.filter(e!.target as HTMLInputElement) });
        }
    }

    public updateProfile(profile: Profile | null): void {
        if (profile !== null) {
            this.setProps({ 'profile': profile });
            this.chatService.loadDialogs();
        }
    }

    public showMdAddNewDialog(): void {
        this.getProps().mdNewDialog.toggle();
    }

    public filter(input: HTMLInputElement): void {
        this.chatService.filteredDialogs(input.value);
    }
}