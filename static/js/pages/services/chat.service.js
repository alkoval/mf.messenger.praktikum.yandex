import { ChatAPI } from "../../core/api/chat-api.js";
import { ChatUsersAPI } from "../../core/api/chat-users-api.js";
import { EventBus } from "../../core/event-bus/event-bus.js";
import { NotifyService } from "../../core/services/notify.service.js";
import { APP_DEFAULT_IMAGE, APP_HOST } from "../../shared/const/constants.js";
import { ChatDialog } from "../../shared/shared.models.js";
import { ProfileService } from "./profile.service.js";
export var CHAT_EVENTS;
(function (CHAT_EVENTS) {
    CHAT_EVENTS["DIALOGS_RELOAD"] = "dialogs-reload";
    CHAT_EVENTS["DIALOG_SELECTED"] = "dialog-selected";
    CHAT_EVENTS["DIALOG_FILTERED"] = "dialog-filtered";
})(CHAT_EVENTS || (CHAT_EVENTS = {}));
export class ChatService {
    constructor() {
        this.eventBus = new EventBus();
        this.dialogs = [];
        this.notifyService = NotifyService.getInstance();
        this.profileService = ProfileService.getInstance();
        this.chatAPI = new ChatAPI();
        this.selectedDialog = null;
        this.chatUsersAPI = new ChatUsersAPI();
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
    filteredDialogs(filter) {
        if (filter.length > 0) {
            const filtered = this.dialogs.filter(d => d.title.startsWith(filter));
            this.eventBus.emit(CHAT_EVENTS.DIALOG_FILTERED, filtered);
        }
        else {
            this.eventBus.emit(CHAT_EVENTS.DIALOG_FILTERED, this.dialogs);
        }
    }
    loadDialogs() {
        return this.chatAPI.request().then(response => {
            const dialogs = [];
            for (let itemRes of JSON.parse(response)) {
                const item = itemRes;
                dialogs.push(new ChatDialog(item.id, item.avatar ? `${APP_HOST}/${item.avatar}` : APP_DEFAULT_IMAGE, item.title, '', new Date(), 0));
                this.setUsersDialog(item.id);
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
    addUserToDialog(id) {
        const exist = this.selectedDialog.profiles.find(e => e.id === id);
        if (!exist) {
            const data = {
                chatId: this.selectedDialog.id,
                users: [id]
            };
            for (let profile of this.selectedDialog.profiles) {
                data.users.push(profile.id);
            }
            this.chatUsersAPI.updadate(data).then(response => {
                let res = response;
                if (res.toLowerCase() === 'ok') {
                    this.setUsersDialog(data.chatId);
                }
            });
        }
    }
    delUserFromDialog(ids) {
        const data = {
            chatId: this.selectedDialog.id,
            users: ids
        };
        this.chatUsersAPI.delete(data).then(response => {
            let res = response;
            if (res.toLowerCase() === 'ok') {
                this.setUsersDialog(data.chatId);
            }
        });
    }
    getProfilesForDelete() {
        let profiles = [];
        if (this.profileService.getProfile() !== null && this.selectedDialog !== null) {
            profiles = this.selectedDialog.profiles.filter(p => p.id !== this.profileService.getProfile().id);
        }
        return profiles;
    }
    setUsersDialog(id) {
        return this.chatUsersAPI.request(id).then(response => {
            if (response) {
                let users = JSON.parse(response);
                const profiles = [];
                for (let user of users) {
                    profiles.push(this.profileService.userResToProfile(user));
                }
                const dialog = this.dialogs.find(d => d.id === id);
                if (dialog) {
                    dialog.profiles = profiles;
                }
                return profiles;
            }
        });
    }
    setSelectedDialog(dialog) {
        this.selectedDialog = dialog;
        this.eventBus.emit(CHAT_EVENTS.DIALOG_SELECTED, this.selectedDialog);
    }
}
//# sourceMappingURL=chat.service.js.map