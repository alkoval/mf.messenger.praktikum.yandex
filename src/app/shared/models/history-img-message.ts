import { HistoryMessage } from "../interfaces/history-message";

export class HistoryImgMessage implements HistoryMessage {
  public chatDialogId: number;
  public type: string;
  public src: string;
  public from: number;
  public unread: boolean;
  public time: Date;
  public shortTime: string;

  constructor(
    chatDialogId: number,
    type: string,
    src: string,
    from: number,
    unread: boolean,
    time: Date
  ) {
    this.chatDialogId = chatDialogId;
    this.type = type;
    this.src = src;
    this.from = from;
    this.unread = unread;
    this.time = time;
    this.shortTime = time.getHours() + ":" + time.getMinutes();
  }
}
