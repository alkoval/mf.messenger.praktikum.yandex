import { Router } from './core/router/router.js';
import { NavService } from './core/core.js';
import { PageService } from './pages/page.service.js';
export class App {
    constructor() {
        this.router = Router.getInstance();
        this.navService = NavService.getInstance();
        this.pageService = PageService.getInstance();
    }
    init() {
        this.navService.setRouter(this.router);
        this.navService.loadRoutes();
        this.pageService.setSelector('.chatapp');
        this.router.start();
    }
}
const chatApp = new App();
chatApp.init();
//# sourceMappingURL=app.js.map