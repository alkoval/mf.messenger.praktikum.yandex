import { Templator } from '../core/core.js';
import { NavItem } from '../shared/interfaces/nav-item.js';
import { Component } from '../shared/interfaces/component.js';
import { IntroPageComponent } from './intro/intro.js';
import { MockupData } from '../core/mockup/mockup-data.js';

export class PageService {
    private mockupData: MockupData;
    private templator: Templator;
    private page: Component;
    private selector: string;

    constructor(selector: string, nav: NavItem, mockupData: MockupData) {
        this.selector = selector;
        this.mockupData = mockupData;
        this.templator = new Templator();
        this.page = this.getPage(nav.route);
    }

    public init(): void {
        this.draw(this.selector);
    }

    private getPage(url: string): Component {
        if (url !== undefined) {

        }
        return new IntroPageComponent(this.mockupData.navItems, this.templator);
    }

    private draw(selector: string): void {
        const root = document.querySelector(selector);
        if (root != null) {
            root.innerHTML = '';
            root.appendChild(this.page.getContent());
        }
    }

}