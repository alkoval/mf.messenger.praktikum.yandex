import { Router } from './core/router/router.js';
import { AuthService, NavService } from './core/core.js';
import { PageService } from './pages/page.service.js';
import { NotifyService } from './core/services/notify.service.js';

export class App {
    private router: Router;
    private navService: NavService;
    private pageService: PageService;
    private notifyService: NotifyService;
    private authService: AuthService;

    constructor() {
        this.router = Router.getInstance();
        this.navService = NavService.getInstance();
        this.pageService = PageService.getInstance();
        this.notifyService = NotifyService.getInstance();
        this.authService = AuthService.getInstance();
    }

    public init(): void {
        this.navService.setRouter(this.router);
        this.navService.loadRoutes();
        this.pageService.setSelector('.chatapp');
        this.notifyService.setSelector('.chatapp');
        this.router.start();
        this.authService.setProfile();
    }
}

const chatApp = new App();
chatApp.init();