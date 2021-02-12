import { NavService } from "../../core/core.js";
import { NavItem } from "../../shared/interfaces/nav-item.js";

export class IntroService {
    private navService: NavService;

    constructor() {
        this.navService = NavService.getInstance();
    }

    public getLinks(): NavItem[] {
        return this.navService.getNavItems();
    }
}