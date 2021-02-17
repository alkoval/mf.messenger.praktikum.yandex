import { NavItem } from "../../shared/interfaces/nav-item"
import Route from "./route"

export class Router {
    private static instance: Router;
    private routes: Route[];
    private currentRoute: Route | null;
    private history: History;

    private constructor() {
        this.routes = [];
        this.currentRoute = null;
        this.history = window.history;
        this.start();
    }

    public static getInstance(): Router {
        if (!this.instance) {
            this.instance = new this();
        }

        return this.instance;
    }

    public use(navItems: NavItem[]): Router {
        for (let item of navItems) {
            const route = new Route(item.path, item.component, item.guard);
            this.routes.push(route);
        }
        return this;
    }

    public start(): void {
        window.onpopstate = (event: any) => {
            this._onRoute(event.currentTarget.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    private _onRoute(path: string): void {
        const route = this.getRoute(path);

        if (this.currentRoute) {
            this.currentRoute.leave();
        }

        if (route !== undefined) {
            this.currentRoute = route;
            route.render();
        }
    }


    public go(path: string): void {
        this.history.pushState({}, "", path);
        this._onRoute(path);
    }

    public back(): void {
        this.history.back()
    }

    public forward(): void {
        this.history.forward()
    }

    public getRoute(path: string): Route | undefined {
        return this.routes.find(route => route.match(path));
    }
}