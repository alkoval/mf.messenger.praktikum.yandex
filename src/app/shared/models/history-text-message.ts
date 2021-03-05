import { HistoryMessage } from "../interfaces/history-message";

export class HistoryTextMessage implements HistoryMessage {
  public id: number;
  public chatDialogId: number;
  public type: string;
  public message: string;
  public from: number;
  public userName: string;
  public unread: boolean;
  public time: Date;
  public shortTime: string;
  public isLeft: boolean;

  constructor(
    id: number,
    type: string,
    message: string,
    from: number,
    unread: boolean,
    time: Date,
    userName: string,
    dialogId: number
  ) {
    this.id = id;
    this.type = type;
    this.message = message;
    this.from = from;
    this.unread = unread;
    this.time = time;
    this.shortTime = time.getHours() + ":" + time.getMinutes();
    this.isLeft = true;
    this.userName = userName;
    this.chatDialogId = dialogId;
  }
}
