import Route from "./route.js";
export class Router {
    constructor() {
        this.routes = [];
        this.currentRoute = null;
        this.history = window.history;
        this.start();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
    use(navItems) {
        for (let item of navItems) {
            const route = new Route(item.path, item.component, item.guard);
            this.routes.push(route);
        }
        return this;
    }
    start() {
        window.onpopstate = (event) => {
            this._onRoute(event.currentTarget.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }
    _onRoute(path) {
        const route = this.getRoute(path);
        if (this.currentRoute) {
            this.currentRoute.leave();
        }
        if (route !== undefined) {
            this.currentRoute = route;
            route.render();
        }
    }
    go(path) {
        this.history.pushState({}, "", path);
        this._onRoute(path);
    }
    back() {
        this.history.back();
    }
    forward() {
        this.history.forward();
    }
    getRoute(path) {
        return this.routes.find(route => route.match(path));
    }
}
//# sourceMappingURL=router.js.map