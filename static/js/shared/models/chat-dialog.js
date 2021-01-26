export class ChatDialog {
    constructor(id, avatar, nickname, message, time, unread) {
        this.id = id;
        this.avatar = avatar;
        this.nickname = nickname;
        this.message = message;
        this.time = time;
        this.unread = unread;
        this.shortTime = time.getHours() + ':' + time.getMinutes();
    }
}
//# sourceMappingURL=chat-dialog.js.map