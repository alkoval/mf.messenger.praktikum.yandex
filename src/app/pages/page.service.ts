import { EVENTS } from '../core/base-component/base-component'
import { Component } from '../shared/interfaces/component'
export class PageService {
    private static instance: PageService;
    private selector: string;

    constructor() {
        this.selector = '';
    }

    public static getInstance(): PageService {
        if (!this.instance) {
            this.instance = new this();
        }

        return this.instance;
    }

    public setSelector(selector: string): void {
        this.selector = selector;
    }

    public render(page: Component): void {
        const root = document.querySelector(this.selector);
        if (root != null) {
            root.innerHTML = '';
            root.appendChild(page.getContent());
        }
    }

    public subscribePageState(page: Component) {
        page.getEventEmitter().on(EVENTS.SHOWN, this.render.bind(this));
    }
}