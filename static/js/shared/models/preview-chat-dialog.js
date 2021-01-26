export class PreviewChatDialog {
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
//# sourceMappingURL=preview-chat-dialog.js.map