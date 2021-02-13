import { NotifyComponent } from "../../shared/components/notify/notify.js";
import { Templator } from "../core.js";
export class NotifyService {
    constructor() {
        this.selector = '';
        this.notifyComponent = null;
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
            if (this.notifyComponent) {
                this.notifyComponent.setProps(notify);
                this.notifyComponent.show();
            }
            else {
                this.notifyComponent = new NotifyComponent(notify, Templator.getInstance());
            }
            root.appendChild(this.notifyComponent.getContent());
        }
    }
}
//# sourceMappingURL=notify.service.js.map