export class ChatDialog {
    public id: number;
    public avatar: string;
    public nickname: string;
    public message: string;
    public time: Date;
    public shortTime: string;
    public unread: number;

    constructor(
        id: number,
        avatar: string,
        nickname: string,
        message: string,
        time: Date,
        unread: number
    ) {
        this.id = id;
        this.avatar = avatar;
        this.nickname = nickname;
        this.message = message;
        this.time = time;
        this.unread = unread;
        this.shortTime = time.getHours() + ':' + time.getMinutes();
    }
}