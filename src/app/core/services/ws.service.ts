import { EventBus } from "../event-bus/event-bus";

export enum WS_EVENTS {
  OPENED = "ws: opened",
  CLOSED = "ws: closed",
  ERROR = "ws: error",
}

export class WebSocketService {
  protected host: string;
  private ws: WebSocket;
  private eventBus: EventBus;

  constructor(path: string) {
    this.host = path;
    this.eventBus = new EventBus();
    this.ws = new WebSocket(this.host);
    this.onOpen();
    this.onClose();
    this.onError();
  }

  private onOpen(): void {
    this.ws.onopen = () => {
      console.log("WS: Соединение установлено!");
      this.eventBus.emit(WS_EVENTS.OPENED);
    };
  }

  private onClose(): void {
    this.ws.onclose = (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }

      console.log(`WS close: код ${event.code} , причина ${event.reason}`);
      this.eventBus.emit(WS_EVENTS.CLOSED);
    };
  }

  private onError(): void {
    this.ws.onerror = (error) => {
      console.log(`WS error: ${error}`);
      this.eventBus.emit(WS_EVENTS.ERROR, error);
    };
  }

  public send(data: string): void {
    this.ws.send(data);
  }

  public close(): void {
    if (this.ws) {
      this.ws.close();
    }
  }

  public subscribeWS(): WebSocket {
    return this.ws;
  }

  public subscribeEvents(): EventBus {
    return this.eventBus;
  }
}
