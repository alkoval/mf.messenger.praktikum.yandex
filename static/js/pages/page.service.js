import { Templator } from '../core/core.js';
import { IntroPageComponent } from './intro/intro.js';
export class PageService {
    constructor(selector, nav, mockupData) {
        this.selector = selector;
        this.mockupData = mockupData;
        this.templator = new Templator();
        this.page = this.getPage(nav.route);
    }
    init() {
        this.draw(this.selector);
    }
    getPage(url) {
        if (url !== undefined) {
        }
        return new IntroPageComponent(this.mockupData.navItems, this.templator);
    }
    draw(selector) {
        const root = document.querySelector(selector);
        if (root != null) {
            root.innerHTML = '';
            root.appendChild(this.page.getContent());
        }
    }
}
//# sourceMappingURL=page.service.js.map