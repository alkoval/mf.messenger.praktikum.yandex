import { ChangePasswordPageComponent } from '../../pages/change-password/change-password.js';
import { ChangeProfilePageComponent } from '../../pages/change-profile/change-profile.js';
import { ChatPageComponent } from '../../pages/chat/chat.js';
import { Error404PageComponent } from '../../pages/error-404/error-404.js';
import { LoginPageComponent } from '../../pages/login/login.js';
import { ProfilePageComponent } from '../../pages/profile/profile.js';
import { SignUpPageComponent } from '../../pages/signup/signup.js';
import { GUARDS } from './guard.service.js';
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
                { text: 'Логин', icon: 'far fa-file list__icon', path: '/', component: LoginPageComponent, guard: null },
                { text: 'Логин', icon: 'far fa-file list__icon', path: '/login', component: LoginPageComponent, guard: null },
                { text: 'Регистрация', icon: 'far fa-file list__icon', path: '/signin', component: SignUpPageComponent, guard: null },
                { text: 'Чат', icon: 'far fa-file list__icon', path: '/chat', component: ChatPageComponent, guard: GUARDS.PROFILE },
                { text: 'Профиль', icon: 'far fa-file list__icon', path: '/profile', component: ProfilePageComponent, guard: GUARDS.PROFILE },
                { text: 'Редактор профиля', icon: 'far fa-file list__icon', path: '/change-profile', component: ChangeProfilePageComponent, guard: GUARDS.PROFILE },
                { text: 'Изменить пароль', icon: 'far fa-file list__icon', path: '/change-password', component: ChangePasswordPageComponent, guard: GUARDS.PROFILE },
                { text: '404', icon: 'far fa-file list__icon', path: '/404', component: Error404PageComponent, guard: GUARDS.PROFILE }
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