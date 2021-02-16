import { ChatAPI } from "../../core/api/chat-api.js";
import { ChatsResponse } from "../../core/api/interfaces/chats-response.js";
import { EventBus } from "../../core/event-bus/event-bus.js";
import { NotifyService } from "../../core/services/notify.service.js";
import { APP_DEFAULT_IMAGE, APP_HOST } from "../../shared/const/constants.js";
import { ChatDialog } from "../../shared/shared.models.js";

export enum CHAT_EVENTS {
    DIALOGS_RELOAD = 'dialogs-reload',
    DIALOG_SELECTED = 'dialog-selected'
}

export class ChatService {
    private static instance: ChatService;
    private eventBus: EventBus;
    private dialogs: ChatDialog[];
    private selectedDialog: ChatDialog | null;
    private notifyService: NotifyService;
    private chatAPI: ChatAPI;

    constructor() {
        this.eventBus = new EventBus();
        this.dialogs = [];
        this.notifyService = NotifyService.getInstance();
        this.chatAPI = new ChatAPI();
        this.selectedDialog = null;
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

    public getDialog(): void {
        //this.chatAPI.request
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

    private setSelectedDialog(dialog: ChatDialog | null): void {
        this.selectedDialog = dialog;
        this.eventBus.emit(CHAT_EVENTS.DIALOG_SELECTED, this.selectedDialog);
    }
} 