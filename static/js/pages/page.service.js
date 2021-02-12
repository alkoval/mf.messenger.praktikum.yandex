import { EVENTS } from '../core/base-component/base-component.js';
export class PageService {
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
    render(page) {
        console.log('pageservice.render');
        const root = document.querySelector(this.selector);
        if (root != null) {
            root.innerHTML = '';
            root.appendChild(page.getContent());
        }
    }
    subscribePageState(page) {
        page.getEventEmitter().on(EVENTS.SHOWN, this.render.bind(this));
    }
}
//# sourceMappingURL=page.service.js.map