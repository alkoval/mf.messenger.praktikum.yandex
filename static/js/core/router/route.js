import { PageService } from "../../pages/page.service.js";
import Templator from "../services/templator.service.js";
export default class Route {
    constructor(path, view) {
        this.path = path;
        this.componentClass = view;
        this.component = null;
        this.pageService = PageService.getInstance();
    }
    navigate(path) {
        if (this.match(path)) {
            this.path = path;
            this.render();
        }
    }
    leave() {
        if (this.component) {
            this.component.hide();
        }
    }
    match(path) {
        return path === this.path;
    }
    render() {
        if (!this.component) {
            this.component = new this.componentClass({}, Templator.getInstance());
            this.pageService.render(this.component);
            this.pageService.subscribePageState(this.component);
            return;
        }
        this.component.show();
    }
}
//# sourceMappingURL=route.js.map