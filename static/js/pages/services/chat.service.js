import { ChatAPI } from "../../core/api/chat-api.js";
import { EventBus } from "../../core/event-bus/event-bus.js";
import { NotifyService } from "../../core/services/notify.service.js";
import { APP_DEFAULT_IMAGE, APP_HOST } from "../../shared/const/constants.js";
import { ChatDialog } from "../../shared/shared.models.js";
export var CHAT_EVENTS;
(function (CHAT_EVENTS) {
    CHAT_EVENTS["DIALOGS_RELOAD"] = "dialogs-reload";
})(CHAT_EVENTS || (CHAT_EVENTS = {}));
export class ChatService {
    constructor() {
        this.eventBus = new EventBus();
        this.dialogs = [];
        this.notifyService = NotifyService.getInstance();
        this.chatAPI = new ChatAPI();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
    subscribe() {
        return this.eventBus;
    }
    setDialogs(dialogs) {
        this.dialogs = dialogs;
        this.eventBus.emit(CHAT_EVENTS.DIALOGS_RELOAD, this.dialogs);
    }
    loadDialogs() {
        return this.chatAPI.request().then(response => {
            const dialogs = [];
            for (let itemRes of JSON.parse(response)) {
                const item = itemRes;
                dialogs.push(new ChatDialog(item.id, item.avatar ? `${APP_HOST}/${item.avatar}` : APP_DEFAULT_IMAGE, item.title, '', new Date(), 0));
            }
            this.setDialogs(dialogs);
            return true;
        });
    }
    createDialog(title) {
        return this.chatAPI.create({ title: title }).then(response => {
            const res = JSON.parse(response);
            if (res.id) {
                return this.loadDialogs().then(flag => {
                    if (flag) {
                        return res.id;
                    }
                });
            }
            else {
                this.notifyService.notify(response);
            }
        });
    }
}
//# sourceMappingURL=chat.service.js.map