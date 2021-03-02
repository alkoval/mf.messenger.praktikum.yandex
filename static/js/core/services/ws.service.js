import { EventBus } from "../event-bus/event-bus.js";
export var WS_EVENTS;
(function (WS_EVENTS) {
    WS_EVENTS["OPENED"] = "ws: opened";
    WS_EVENTS["CLOSED"] = "ws: closed";
    WS_EVENTS["ERROR"] = "ws: error";
})(WS_EVENTS || (WS_EVENTS = {}));
export class WebSocketService {
    constructor(path) {
        this.host = path;
        this.eventBus = new EventBus();
        this.ws = new WebSocket(this.host);
        this.onOpen();
        this.onClose();
        this.onError();
    }
    onOpen() {
        this.ws.onopen = () => {
            console.log('WS: Соединение установлено!');
            this.eventBus.emit(WS_EVENTS.OPENED);
        };
    }
    onClose() {
        this.ws.onclose = (event) => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            }
            else {
                console.log('Обрыв соединения');
            }
            console.log(`WS close: код ${event.code} , причина ${event.reason}`);
            this.eventBus.emit(WS_EVENTS.CLOSED);
        };
    }
    onError() {
        this.ws.onerror = (error) => {
            console.log(`WS error: ${error}`);
            this.eventBus.emit(WS_EVENTS.ERROR, error);
        };
    }
    send(data) {
        this.ws.send(data);
    }
    close() {
        if (this.ws) {
            this.ws.close();
        }
    }
    subscribeWS() {
        return this.ws;
    }
    subscribeEvents() {
        return this.eventBus;
    }
}
//# sourceMappingURL=ws.service.js.map