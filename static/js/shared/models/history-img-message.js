export class HistoryImgMessage {
    constructor(chatDialogId, type, src, from, unread, time) {
        this.chatDialogId = chatDialogId;
        this.type = type;
        this.src = src;
        this.from = from;
        this.unread = unread;
        this.time = time;
        this.shortTime = time.getHours() + ':' + time.getMinutes();
    }
}
//# sourceMappingURL=history-img-message.js.map