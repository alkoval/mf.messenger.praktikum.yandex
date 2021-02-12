import { ChangePasswordPageComponent } from '../../pages/change-password/change-password.js';
import { ChangeProfilePageComponent } from '../../pages/change-profile/change-profile.js';
import { ChatPageComponent } from '../../pages/chat/chat.js';
import { Error404PageComponent } from '../../pages/error-404/error-404.js';
import { IntroPageComponent } from '../../pages/intro/intro.js';
import { LoginPageComponent } from '../../pages/login/login.js';
import { ProfilePageComponent } from '../../pages/profile/profile.js';
import { SigninPageComponent } from '../../pages/signin/signin.js';
export default class NavService {
    constructor() {
        this.navItems = [];
        this.router = null;
    }
    setRouter(router) {
        this.router = router;
    }
    loadRoutes() {
        if (this.router) {
            this.navItems = [] = [
                { text: 'Интро', icon: 'far fa-file list__icon', path: '/', component: IntroPageComponent },
                { text: 'Логин', icon: 'far fa-file list__icon', path: '/login', component: LoginPageComponent },
                { text: 'Регистрация', icon: 'far fa-file list__icon', path: '/signin', component: SigninPageComponent },
                { text: 'Чат', icon: 'far fa-file list__icon', path: '/chat', component: ChatPageComponent },
                { text: 'Профиль', icon: 'far fa-file list__icon', path: '/profile', component: ProfilePageComponent },
                { text: 'Редактор профиля', icon: 'far fa-file list__icon', path: '/change-profile', component: ChangeProfilePageComponent },
                { text: 'Изменить пароль', icon: 'far fa-file list__icon', path: '/change-password', component: ChangePasswordPageComponent },
                { text: '404', icon: 'far fa-file list__icon', path: '/404', component: Error404PageComponent }
            ];
            this.router.use(this.navItems);
        }
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
    getNavItems() {
        return this.navItems;
    }
    getActiveNavItem() {
        for (let nav of this.navItems) {
            if (window.location.href.endsWith(nav.path)) {
                return nav;
            }
        }
        return this.navItems[0];
    }
}
//# sourceMappingURL=nav.service.js.map