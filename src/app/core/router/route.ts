import { PageService } from "../../pages/page.service"
import { Component } from "../../shared/interfaces/component"
import { ComponentConstructor } from "../../shared/interfaces/component-contstructor"
import Templator from "../services/templator.service"

export default class Route {
    private path: string;
    private componentClass: ComponentConstructor;
    private component: Component | null;
    private pageService: PageService;
    private guard: string | null;

    constructor(path: string, view: ComponentConstructor, guard: string | null) {
        this.path = path;
        this.componentClass = view;
        this.component = null;
        this.pageService = PageService.getInstance();
        this.guard = guard;
    }

    public navigate(path: string): void {
        if (this.match(path)) {
            this.path = path;
            this.render();
        }
    }

    public leave(): void {
        if (this.component) {
            this.component.hide();
        }
    }

    public match(path: string): boolean {
        return path === this.path;
    }

    public render(): void {
        if (!this.component) {
            this.component = new this.componentClass({ "root": "" }, Templator.getInstance());
            this.pageService.render(this.component);
            this.pageService.subscribePageState(this.component);
            return;
        }

        this.component.show();
    }

    public getGuard(): string | null {
        return this.guard;
    }
} 