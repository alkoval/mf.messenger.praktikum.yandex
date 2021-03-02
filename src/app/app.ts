import '../styles/app.scss';
import { Router } from './core/router/router';
import { NavService } from './core/core';
import { PageService } from './pages/page.service';
import { NotifyService } from './core/services/notify.service';

export class App {
    private router: Router;
    private navService: NavService;
    private pageService: PageService;
    private notifyService: NotifyService;

    constructor() {
        this.router = Router.getInstance();
        this.navService = NavService.getInstance();
        this.pageService = PageService.getInstance();
        this.notifyService = NotifyService.getInstance();
    }

    public init(): void {
        this.navService.setRouter(this.router);
        this.navService.loadRoutes();
        this.pageService.setSelector('.chatapp');
        this.notifyService.setSelector('.chatapp');
        this.router.start();
    }
}

const chatApp = new App();
chatApp.init();