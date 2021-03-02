export class HistoryTextMessage {
    constructor(chatDialogId, type, message, from, unread, time, userName) {
        this.chatDialogId = chatDialogId;
        this.type = type;
        this.message = message;
        this.from = from;
        this.unread = unread;
        this.time = time;
        this.shortTime = time.getHours() + ':' + time.getMinutes();
        this.isLeft = true;
        this.userName = userName;
    }
}
//# sourceMappingURL=history-text-message.js.map