import { HistoryMessage } from "../interfaces/history-message";

export class HistoryTextMessage implements HistoryMessage {
    public chatDialogId: number;
    public type: string;
    public message: string;
    public from: number;
    public unread: boolean;
    public time: Date;
    public shortTime: string;

    constructor(
        chatDialogId: number,
        type: string,
        message: string,
        from: number,
        unread: boolean,
        time: Date
    ) {
        this.chatDialogId = chatDialogId;
        this.type = type;
        this.message = message;
        this.from = from;
        this.unread = unread;
        this.time = time;
        this.shortTime = time.getHours() + ':' + time.getMinutes();
    }
}