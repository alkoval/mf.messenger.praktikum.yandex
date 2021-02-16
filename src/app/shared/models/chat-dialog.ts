import { Profile } from "./profile";

export class ChatDialog {
    public id: number;
    public avatar: string;
    public title: string;
    public message: string;
    public time: Date;
    public shortTime: string;
    public unread: number;
    public profiles: Profile[];

    constructor(
        id: number,
        avatar: string,
        title: string,
        message: string,
        time: Date,
        unread: number
    ) {
        this.id = id;
        this.avatar = avatar;
        this.title = title;
        this.message = message;
        this.time = time;
        this.unread = unread;
        this.shortTime = time.getHours() + ':' + time.getMinutes();
        this.profiles = [];
    }
}