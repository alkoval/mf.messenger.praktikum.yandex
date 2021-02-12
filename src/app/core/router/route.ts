import { PageService } from "../../pages/page.service.js";
import { Component } from "../../shared/interfaces/component.js";
import { ComponentConstructor } from "../../shared/interfaces/component-contstructor.js";
import Templator from "../services/templator.service.js";

export default class Route {
    private path: string;
    private componentClass: ComponentConstructor;
    private component: Component | null;
    private pageService: PageService;

    constructor(path: string, view: ComponentConstructor) {
        this.path = path;
        this.componentClass = view;
        this.component = null;
        this.pageService = PageService.getInstance();
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
            this.component = new this.componentClass({}, Templator.getInstance());
            this.pageService.render(this.component);
            this.pageService.subscribePageState(this.component);
            return;
        }

        this.component.show();
    }
} 