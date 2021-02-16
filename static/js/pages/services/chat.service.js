import { ChatAPI } from "../../core/api/chat-api.js";
import { EventBus } from "../../core/event-bus/event-bus.js";
import { NotifyService } from "../../core/services/notify.service.js";
import { APP_DEFAULT_IMAGE, APP_HOST } from "../../shared/const/constants.js";
import { ChatDialog } from "../../shared/shared.models.js";
export var CHAT_EVENTS;
(function (CHAT_EVENTS) {
    CHAT_EVENTS["DIALOGS_RELOAD"] = "dialogs-reload";
    CHAT_EVENTS["DIALOG_SELECTED"] = "dialog-selected";
})(CHAT_EVENTS || (CHAT_EVENTS = {}));
export class ChatService {
    constructor() {
        this.eventBus = new EventBus();
        this.dialogs = [];
        this.notifyService = NotifyService.getInstance();
        this.chatAPI = new ChatAPI();
        this.selectedDialog = null;
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
    getDialog() {
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
        this.chatAPI.create({ title: title }).then(response => {
            const res = JSON.parse(response);
            if (res.id) {
                this.loadDialogs().then(flag => {
                    if (flag) {
                        const dialog = this.dialogs.find(d => d.id === res.id);
                        if (dialog) {
                            this.setSelectedDialog(dialog);
                        }
                    }
                });
            }
            else {
                this.notifyService.notify(response);
            }
        });
    }
    deleteDialog(id) {
        this.chatAPI.delete({ chatId: id }).then(() => {
            this.setSelectedDialog(null);
            this.loadDialogs();
        });
    }
    getSelectedDialog() {
        return this.selectedDialog;
    }
    selectDialogById(id) {
        const dialog = this.dialogs.find(d => d.id === id);
        if (dialog) {
            this.setSelectedDialog(dialog);
        }
    }
    setSelectedDialog(dialog) {
        this.selectedDialog = dialog;
        this.eventBus.emit(CHAT_EVENTS.DIALOG_SELECTED, this.selectedDialog);
    }
}
//# sourceMappingURL=chat.service.js.map