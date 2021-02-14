import { NotifyComponent } from "../../shared/components/notify/notify.js";
import { Templator } from "../core.js";
export class NotifyService {
    constructor() {
        this.selector = '';
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
    setSelector(selector) {
        this.selector = selector;
    }
    show(notify) {
        const root = document.querySelector(this.selector);
        if (root !== null) {
            const notifyComponent = new NotifyComponent(notify, Templator.getInstance());
            root.appendChild(notifyComponent.getContent());
        }
    }
    notify(message, time) {
        this.show({
            message: message,
            time: time ? time : 5000
        });
    }
}
//# sourceMappingURL=notify.service.js.map