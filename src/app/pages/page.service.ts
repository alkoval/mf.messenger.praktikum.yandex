import { Templator } from '../core/core.js';
import { NavItem } from '../shared/interfaces/nav-item.js';
import { Component } from '../shared/interfaces/component.js';
import { MockupData } from '../core/mockup/mockup-data.js';
import { IntroPageComponent } from './intro/intro.js';
import { LoginPageComponent } from './login/login.js';
import { SigninPageComponent } from './signin/signin.js';
import { ChatPageComponent } from './chat/chat.js';
import { ProfilePageComponent } from './profile/profile.js';
import { ChangeProfilePageComponent } from './change-profile/change-profile.js';
import { ChangePasswordPageComponent } from './change-password/change-password.js';

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
            if (url.endsWith('/index.html')) {
                return new IntroPageComponent(this.mockupData.navItems, this.templator);
            }
            if (url.endsWith('/login.html')) {
                return new LoginPageComponent({}, this.templator);
            }
            if (url.endsWith('/signin.html')) {
                return new SigninPageComponent({}, this.templator);
            }
            if (url.endsWith('/chat.html')) {
                return new ChatPageComponent(this.mockupData.previewChatDialogs, this.templator);
            }
            if (url.endsWith('/profile.html')) {
                return new ProfilePageComponent(this.mockupData.profile, this.templator);
            }
            if (url.endsWith('/change-profile.html')) {
                return new ChangeProfilePageComponent(this.mockupData.profile, this.templator);
            }
            if (url.endsWith('/change-password.html')) {
                return new ChangePasswordPageComponent(this.mockupData.profile, this.templator);
            }
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