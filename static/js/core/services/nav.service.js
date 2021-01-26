export default class NavService {
    constructor() {
        this.navItems = [];
        this.location = window.location.href;
        this.loadOfflineRoutes();
    }
    loadOfflineRoutes() {
        this.navItems = [
            { text: 'Интро', icon: 'far fa-file list__icon', route: '/index.html' },
            { text: 'Логин', icon: 'far fa-file list__icon', route: '/login.html' },
            { text: 'Регистрация', icon: 'far fa-file list__icon', route: '/signin.html' },
            { text: 'Чат', icon: 'far fa-file list__icon', route: '/chat.html' },
            { text: 'Профиль', icon: 'far fa-file list__icon', route: '/profile.html' },
            { text: 'Редактор профиля', icon: 'far fa-file list__icon', route: '/change-profile.html' },
            { text: 'Изменить пароль', icon: 'far fa-file list__icon', route: '/change-password.html' },
            { text: '404', icon: 'far fa-file list__icon', route: '/404.html' },
        ];
    }
    getNavItems() {
        return this.navItems;
    }
    getActiveNavItem() {
        for (let nav of this.navItems) {
            if (this.location.endsWith(nav.route)) {
                return nav;
            }
        }
        return this.navItems[0];
    }
}
//# sourceMappingURL=nav.service.js.map