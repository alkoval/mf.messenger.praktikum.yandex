import { NotifyComponent } from "../../shared/components/notify/notify.js";
import { Notify } from "../../shared/interfaces/notify.js";
import { Templator } from "../core.js";

export class NotifyService {
    private static instance: NotifyService;
    private selector: string;
    private notifyComponent: NotifyComponent | null;

    constructor() {
        this.selector = '';
        this.notifyComponent = null;
    }

    public static getInstance(): NotifyService {
        if (!this.instance) {
            this.instance = new this();
        }

        return this.instance;
    }

    public setSelector(selector: string): void {
        this.selector = selector;
    }

    public show(notify: Notify) {
        const root = document.querySelector(this.selector);
        if (root !== null) {
            if (this.notifyComponent) {
                this.notifyComponent.setProps(notify);
                this.notifyComponent.show();
            } else {
                this.notifyComponent = new NotifyComponent(notify, Templator.getInstance());
            }
            root.appendChild(this.notifyComponent.getContent());
        }
    }
}