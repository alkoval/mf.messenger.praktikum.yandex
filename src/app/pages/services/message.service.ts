import { EventBus } from "../../core/event-bus/event-bus";
import { WebSocketService, WS_EVENTS } from "../../core/services/ws.service";
import { ChatService } from "./chat.service";
import { ProfileService } from "./profile.service";
import { APP_WS_HOST } from "../../shared/const/constants";
import { ChatTokenAPI } from "../../core/api/chat-token-api";
import { DialogMessage } from "../../shared/interfaces/dialog-message";
import { HistoryTextMessage } from "../../shared/shared.models";
import { ArhiveMessage } from "../../shared/interfaces/archive-message";

export enum MESSAGE_EVENTS {
  NEW_MESSAGE = "new-message",
  ARCHIVE_MESSAGE = "archive-message",
}

export class MessageService {
  private static instance: MessageService;
  private eventBus: EventBus;
  private wsService: WebSocketService | null;
  private chatTokenApi: ChatTokenAPI;
  private token: string;
  private profileService: ProfileService;
  private chatService: ChatService;

  constructor() {
    this.eventBus = new EventBus();
    this.wsService = null;
    this.chatTokenApi = new ChatTokenAPI();
    this.token = "";
    this.profileService = ProfileService.getInstance();
    this.chatService = ChatService.getInstance();
  }

  public static getInstance(): MessageService {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  public subscribe(): EventBus {
    return this.eventBus;
  }

  private disconect(): void {
    if (this.wsService) {
      this.wsService.close();
      this.wsService = null;
      this.token = "";
    }
  }

  public connect(archive: boolean): void {
    this.disconect();
    if (this.chatService.getSelectedDialog()) {
      const dialogId: number = this.chatService.getSelectedDialog()!.id;
      const userId = this.profileService.getProfile()!.id;
      this.chatTokenApi.request(dialogId).then((response) => {
        const res = JSON.parse(response as string);
        this.token = res.token;
        this.wsService = new WebSocketService(
          `${APP_WS_HOST}/ws/chats/${userId}/${dialogId}/${this.token}`
        );
        this.wsService.subscribeWS().onmessage = (event) => {
          this.intercepter(JSON.parse(event.data));
        };

        if (archive) {
          this.wsService.subscribeWS().onopen = () => {
            this.getArchive(0);
          };
        }

        this.wsService
          .subscribeEvents()
          .on(WS_EVENTS.CLOSED, this.reconnect.bind(this));
      });
    }
  }

  public reconnect(): void {
    this.connect(false);
  }

  public intercepter(data: DialogMessage | ArhiveMessage[]): void {
    // eslint-disable-next-line no-negated-condition
    if (!Array.isArray(data)) {
      if (data.type === "message") {
        const profile = this.chatService
          .getSelectedDialog()
          ?.profiles.find((e) => e.id === data.userId);
        const msg = new HistoryTextMessage(
          data.id,
          data.type,
          data.content,
          data.userId,
          false,
          new Date(data.time),
          profile ? profile.name : ""
        );
        this.eventBus.emit(MESSAGE_EVENTS.NEW_MESSAGE, msg);
      }
    } else {
      const arr = [];
      for (const item of data) {
        const profile = this.chatService
          .getSelectedDialog()
          ?.profiles.find((e) => e.id === item.user_id);
        arr.push(
          new HistoryTextMessage(
            item.id,
            item.type,
            item.content,
            item.user_id,
            false,
            new Date(item.time),
            profile ? profile.name : ""
          )
        );
      }

      this.eventBus.emit(MESSAGE_EVENTS.ARCHIVE_MESSAGE, arr);
    }
  }

  public send(message: string): void {
    if (this.wsService) {
      this.wsService.send(
        JSON.stringify({ content: message, type: "message" })
      );
    }
  }

  public getArchive(num: number): void {
    if (this.wsService) {
      this.wsService.send(
        JSON.stringify({ content: num.toString(), type: "get old" })
      );
    }
  }
}
