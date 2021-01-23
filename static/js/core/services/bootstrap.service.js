import { MockupData } from '../mockup/mockup-data.js';
export default class BootstrapService {
    constructor(navServise) {
        this.navServise = navServise;
        this.mockupData = new MockupData();
        this.init();
    }
    init() {
        this.prepaireMockupNavItems();
    }
    prepaireMockupNavItems() {
        this.mockupData.navItems = this.navServise.getNavItems();
    }
}
//# sourceMappingURL=bootstrap.service.js.map