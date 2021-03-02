import { EventBus } from "../../core/event-bus/event-bus.js";
import { WebSocketService, WS_EVENTS } from "../../core/services/ws.service.js";
import { ChatService } from "./chat.service.js";
import { ProfileService } from "./profile.service.js";
import { APP_WS_HOST } from '../../shared/const/constants.js';
import { ChatTokenAPI } from '../../core/api/chat-token-api.js';
import { HistoryTextMessage } from "../../shared/shared.models.js";
export var MESSAGE_EVENTS;
(function (MESSAGE_EVENTS) {
    MESSAGE_EVENTS["NEW_MESSAGE"] = "new-message";
    MESSAGE_EVENTS["ARCHIVE_MESSAGE"] = "archive-message";
})(MESSAGE_EVENTS || (MESSAGE_EVENTS = {}));
export class MessageService {
    constructor() {
        this.eventBus = new EventBus();
        this.wsService = null;
        this.chatTokenApi = new ChatTokenAPI();
        this.token = '';
        this.profileService = ProfileService.getInstance();
        this.chatService = ChatService.getInstance();
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
    disconect() {
        if (this.wsService) {
            this.wsService.close;
            this.wsService = null;
            this.token = '';
        }
    }
    connect(archive) {
        this.disconect();
        if (this.chatService.getSelectedDialog()) {
            const dialogId = this.chatService.getSelectedDialog().id;
            const userId = this.profileService.getProfile().id;
            this.chatTokenApi.request(dialogId).then(response => {
                const res = JSON.parse(response);
                this.token = res.token;
                this.wsService = new WebSocketService(`${APP_WS_HOST}/ws/chats/${userId}/${dialogId}/${this.token}`);
                this.wsService.subscribeWS().onmessage = (event) => {
                    this.intercepter(JSON.parse(event.data));
                };
                if (archive) {
                    this.wsService.subscribeWS().onopen = () => {
                        this.getArchive(0);
                    };
                }
                this.wsService.subscribeEvents().on(WS_EVENTS.CLOSED, this.reconnect.bind(this));
            });
        }
    }
    reconnect() {
        this.connect(false);
    }
    intercepter(data) {
        var _a, _b;
        if (!Array.isArray(data)) {
            if (data.type === 'message') {
                const profile = (_a = this.chatService.getSelectedDialog()) === null || _a === void 0 ? void 0 : _a.profiles.find(e => e.id === data.userId);
                const msg = new HistoryTextMessage(data.id, data.type, data.content, data.userId, false, new Date(data.time), profile ? profile.name : '');
                this.eventBus.emit(MESSAGE_EVENTS.NEW_MESSAGE, msg);
            }
        }
        else {
            const arr = [];
            for (let item of data) {
                const profile = (_b = this.chatService.getSelectedDialog()) === null || _b === void 0 ? void 0 : _b.profiles.find(e => e.id === item.user_id);
                arr.push(new HistoryTextMessage(item.id, item.type, item.content, item.user_id, false, new Date(item.time), profile ? profile.name : ''));
            }
            this.eventBus.emit(MESSAGE_EVENTS.ARCHIVE_MESSAGE, arr);
        }
    }
    send(message) {
        if (this.wsService) {
            this.wsService.send(JSON.stringify({ content: message, type: 'message' }));
        }
    }
    getArchive(num) {
        if (this.wsService) {
            this.wsService.send(JSON.stringify({ content: num.toString(), type: 'get old' }));
        }
    }
}
//# sourceMappingURL=message.service.js.map