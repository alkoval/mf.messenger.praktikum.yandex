import { ChatAPI } from "../../core/api/chat-api.js";
import { ChatsResponse } from "../../core/api/interfaces/chats-response.js";
import { NotifyService } from "../../core/services/notify.service.js";
import { Store } from "../../core/store/store.js";
import { ChatDialog } from "../../shared/shared.models.js";

export class ChatService {
    private store: Store;
    private notifyService: NotifyService;
    private chatAPI: ChatAPI;

    constructor() {
        this.store = Store.getInstance();
        this.notifyService = NotifyService.getInstance();
        this.chatAPI = new ChatAPI();
    }

    public getDialogs(): Promise<unknown> {
        return this.chatAPI.request().then(
            response => {
                const dialogs: ChatDialog[] = [];
                for (let itemRes of JSON.parse(response as string)) {
                    const item: ChatsResponse = itemRes as ChatsResponse;
                    dialogs.push(new ChatDialog(
                        item.id,
                        item.avatar ? `${this.store.getHost()}/${item.avatar}` : this.store.getDefImg(),
                        item.title,
                        '',
                        new Date(),
                        0
                    ));
                }
                return dialogs;
            }
        )
    }

    public create(title: string): Promise<unknown> {
        return this.chatAPI.create({ title: title }).then(
            response => {
                const res = JSON.parse(response as string);
                if (res.id) {
                    return res.id;
                } else {
                    this.notifyService.notify(response as string);
                }
            }
        )
    }
} 