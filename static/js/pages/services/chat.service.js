import { ChatAPI } from "../../core/api/chat-api.js";
import { NotifyService } from "../../core/services/notify.service.js";
import { Store } from "../../core/store/store.js";
import { ChatDialog } from "../../shared/shared.models.js";
export class ChatService {
    constructor() {
        this.store = Store.getInstance();
        this.notifyService = NotifyService.getInstance();
        this.chatAPI = new ChatAPI();
    }
    getDialogs() {
        return this.chatAPI.request().then(response => {
            const dialogs = [];
            for (let itemRes of JSON.parse(response)) {
                const item = itemRes;
                dialogs.push(new ChatDialog(item.id, item.avatar ? `${this.store.getHost()}/${item.avatar}` : this.store.getDefImg(), item.title, '', new Date(), 0));
            }
            return dialogs;
        });
    }
    create(title) {
        return this.chatAPI.create({ title: title }).then(response => {
            const res = JSON.parse(response);
            if (res.id) {
                return res.id;
            }
            else {
                this.notifyService.notify(response);
            }
        });
    }
}
//# sourceMappingURL=chat.service.js.map