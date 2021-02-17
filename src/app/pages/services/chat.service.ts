import { ChatAPI } from "../../core/api/chat-api"
import { ChatUsersAPI } from "../../core/api/chat-users-api"
import { ChatsResponse } from "../../core/api/interfaces/chats-response"
import { UserResponse } from "../../core/api/interfaces/user-response"
import { UsersRequest } from "../../core/api/interfaces/users-request"
import { EventBus } from "../../core/event-bus/event-bus"
import { NotifyService } from "../../core/services/notify.service"
import { APP_DEFAULT_IMAGE, APP_HOST } from "../../shared/const/constants"
import { ChatDialog, Profile } from "../../shared/shared.models"
import { ProfileService } from "./profile.service"

export enum CHAT_EVENTS {
    DIALOGS_RELOAD = 'dialogs-reload',
    DIALOG_SELECTED = 'dialog-selected',
    DIALOG_FILTERED = 'dialog-filtered',
}

export class ChatService {
    private static instance: ChatService;
    private eventBus: EventBus;
    private dialogs: ChatDialog[];
    private selectedDialog: ChatDialog | null;
    private notifyService: NotifyService;
    private profileService: ProfileService;
    private chatAPI: ChatAPI;
    private chatUsersAPI: ChatUsersAPI;

    constructor() {
        this.eventBus = new EventBus();
        this.dialogs = [];
        this.notifyService = NotifyService.getInstance();
        this.profileService = ProfileService.getInstance();
        this.chatAPI = new ChatAPI();
        this.selectedDialog = null;
        this.chatUsersAPI = new ChatUsersAPI();
    }

    public static getInstance(): ChatService {
        if (!this.instance) {
            this.instance = new this();
        }

        return this.instance;
    }

    public subscribe(): EventBus {
        return this.eventBus;
    }

    public setDialogs(dialogs: ChatDialog[]): void {
        this.dialogs = dialogs;
        this.eventBus.emit(CHAT_EVENTS.DIALOGS_RELOAD, this.dialogs);
    }

    public filteredDialogs(filter: string): void {
        if (filter.length > 0) {
            const filtered = this.dialogs.filter(d => d.title.startsWith(filter));
            this.eventBus.emit(CHAT_EVENTS.DIALOG_FILTERED, filtered);
        } else {
            this.eventBus.emit(CHAT_EVENTS.DIALOG_FILTERED, this.dialogs);
        }
    }

    public loadDialogs(): Promise<unknown> {
        return this.chatAPI.request().then(
            response => {
                const dialogs: ChatDialog[] = [];
                for (let itemRes of JSON.parse(response as string)) {
                    const item: ChatsResponse = itemRes as ChatsResponse;
                    dialogs.push(new ChatDialog(
                        item.id,
                        item.avatar ? `${APP_HOST}/${item.avatar}` : APP_DEFAULT_IMAGE,
                        item.title,
                        '',
                        new Date(),
                        0
                    ));
                    this.setUsersDialog(item.id);
                }
                this.setDialogs(dialogs);
                return true;
            }
        )
    }

    public createDialog(title: string): void {
        this.chatAPI.create({ title: title }).then(
            response => {
                const res = JSON.parse(response as string);
                if (res.id) {
                    this.loadDialogs().then(
                        flag => {
                            if (flag) {
                                const dialog = this.dialogs.find(d => d.id === res.id);
                                if (dialog) {
                                    this.setSelectedDialog(dialog);
                                }
                            }
                        }
                    );
                } else {
                    this.notifyService.notify(response as string);
                }
            }
        )
    }

    public deleteDialog(id: number): void {
        this.chatAPI.delete({ chatId: id }).then(
            () => {
                this.setSelectedDialog(null);
                this.loadDialogs();
            }
        )
    }

    public getSelectedDialog(): ChatDialog | null {
        return this.selectedDialog;
    }

    public selectDialogById(id: number): void {
        const dialog = this.dialogs.find(d => d.id === id);
        if (dialog) {
            this.setSelectedDialog(dialog);
        }
    }

    public addUserToDialog(id: number): void {
        const exist = this.selectedDialog!.profiles.find(e => e.id === id);
        if (!exist) {
            const data: UsersRequest = {
                chatId: this.selectedDialog!.id,
                users: [id]
            };
            for (let profile of this.selectedDialog!.profiles) {
                data.users.push(profile.id);
            }
            this.chatUsersAPI.updadate(data).then(
                response => {
                    let res: string = response as string;
                    if (res.toLowerCase() === 'ok') {
                        this.setUsersDialog(data.chatId);
                    }
                }
            )
        }
    }

    public delUserFromDialog(ids: number[]): void {
        const data: UsersRequest = {
            chatId: this.selectedDialog!.id,
            users: ids
        };
        this.chatUsersAPI.delete(data).then(
            response => {
                let res: string = response as string;
                if (res.toLowerCase() === 'ok') {
                    this.setUsersDialog(data.chatId);
                }
            }
        )
    }

    public getProfilesForDelete(): Profile[] {
        let profiles: Profile[] = [];
        if (this.profileService.getProfile() !== null && this.selectedDialog !== null) {
            profiles = this.selectedDialog.profiles.filter(p => p.id !== this.profileService.getProfile()!.id);
        }
        return profiles;
    }

    private setUsersDialog(id: number): Promise<unknown> {
        return this.chatUsersAPI.request(id).then(
            response => {
                if (response) {
                    let users: UserResponse[] = JSON.parse(response as string);
                    const profiles: Profile[] = [];
                    for (let user of users) {
                        profiles.push(this.profileService.userResToProfile(user));
                    }
                    const dialog = this.dialogs.find(d => d.id === id);
                    if (dialog) {
                        dialog.profiles = profiles;
                    }
                    return profiles;
                }
            }
        )
    }

    private setSelectedDialog(dialog: ChatDialog | null): void {
        this.selectedDialog = dialog;
        this.eventBus.emit(CHAT_EVENTS.DIALOG_SELECTED, this.selectedDialog);
    }
} 