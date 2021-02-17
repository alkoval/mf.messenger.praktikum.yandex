import { NavService } from "../../core/core"
import { NavItem } from "../../shared/interfaces/nav-item"

export class IntroService {
    private navService: NavService;

    constructor() {
        this.navService = NavService.getInstance();
    }

    public getLinks(): NavItem[] {
        return this.navService.getNavItems();
    }
}