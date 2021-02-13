export class EventBus {
    // Пока нет идеи, как избавиться от any[]
    private listeners: Map<string, any[]> = new Map();

    constructor() { }

    public on<T>(event: string, callback: T): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }

        this.listeners.get(event)?.push(callback);
    }

    off<T>(event: string, callback: T) {
        if (this.listeners.has(event)) {
            this.listeners.set(event, this.listeners.get(event)!.filter(
                listener => listener !== callback
            ));
        }
    }

    emit<T>(event: string, ...args: T[]) {
        if (this.listeners.has(event)) {
            this.listeners.get(event)!.forEach(function (listener) {
                listener(...args);
            });
        }
    }
}