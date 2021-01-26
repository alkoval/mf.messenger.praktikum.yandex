export class EventBus {
    constructor() {
        this.listeners = new Map();
    }
    on(event, callback) {
        var _a;
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        (_a = this.listeners.get(event)) === null || _a === void 0 ? void 0 : _a.push(callback);
    }
    off(event, callback) {
        if (!this.listeners.has(event)) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners.set(event, this.listeners.get(event).filter(listener => listener !== callback));
    }
    emit(event, ...args) {
        if (!this.listeners.has(event)) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners.get(event).forEach(function (listener) {
            listener(...args);
        });
    }
}
//# sourceMappingURL=event-bus.js.map