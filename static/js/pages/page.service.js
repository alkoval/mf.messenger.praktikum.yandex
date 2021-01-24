import { Templator } from '../core/core.js';
import { IntroPageComponent } from './intro/intro.js';
import { LoginPageComponent } from './login/login.js';
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
            if (url.endsWith('login.html')) {
                return new LoginPageComponent({}, this.templator);
            }
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