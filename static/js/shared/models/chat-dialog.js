export class ChatDialog {
    constructor(id, avatar, title, message, time, unread) {
        this.id = id;
        this.avatar = avatar;
        this.title = title;
        this.message = message;
        this.time = time;
        this.unread = unread;
        this.shortTime = time.getHours() + ':' + time.getMinutes();
    }
}
//# sourceMappingURL=chat-dialog.js.map