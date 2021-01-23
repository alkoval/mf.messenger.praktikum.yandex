import { MockupData } from '../mockup/mockup-data.js';
import NavServise from './nav.service.js';

export default class BootstrapService {
    private navServise: NavServise;
    public mockupData: MockupData;

    constructor(navServise: NavServise) {
        this.navServise = navServise;
        this.mockupData = new MockupData();
        this.init();
    }

    private init(): void {
        this.prepaireMockupNavItems();
    }

    private prepaireMockupNavItems(): void {
        this.mockupData.navItems = this.navServise.getNavItems();
    }
}