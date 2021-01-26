import BootstrapService from './core/services/bootstrap.service.js';
import { NavService } from './core/core.js';
import { PageService } from './pages/page.service.js';

export class App {
    private bootstrapService: BootstrapService;
    private navService: NavService;
    private pageService: PageService;

    constructor() {
        this.navService = new NavService();
        this.bootstrapService = new BootstrapService(this.navService);
        this.pageService = new PageService('.chatapp', this.navService.getActiveNavItem(), this.bootstrapService.mockupData);        
    }

    public init(): void {        
        this.pageService.init();        
    }
}

const chatApp = new App();
chatApp.init();