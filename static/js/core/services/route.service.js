export default class NavServise {
    constructor() {
        this.navItems = [];
        this.loadOfflineRoutes();
    }
    loadOfflineRoutes() {
        this.navItems = [
            { text: 'Логин', icon: 'far fa-file list__icon', route: '/login.html' },
            { text: 'Регистрация', icon: 'far fa-file list__icon', route: '/signin.html' },
            { text: 'Чат', icon: 'far fa-file list__icon', route: '/chat.html' },
            { text: 'Диалог', icon: 'far fa-file list__icon', route: '/selected-dialog.html' },
            { text: 'Профиль', icon: 'far fa-file list__icon', route: '/profile.html' },
            { text: 'Редактор профиля', icon: 'far fa-file list__icon', route: '/change-profile.html' },
            { text: 'Изменить пароль', icon: 'far fa-file list__icon', route: '/change-password.html' },
        ];
    }
}
//# sourceMappingURL=route.service.js.map