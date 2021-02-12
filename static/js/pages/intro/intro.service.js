import { NavService } from "../../core/core.js";
export class IntroService {
    constructor() {
        this.navService = NavService.getInstance();
    }
    getLinks() {
        return this.navService.getNavItems();
    }
}
//# sourceMappingURL=intro.service.js.map