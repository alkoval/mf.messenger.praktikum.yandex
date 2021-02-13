import { AuthSignInAPI } from "../api/auth-signin-api.js";
import { AuthSignUpAPI } from "../api/auth-signup-api.js";
import { AuthUserAPI } from "../api/auth-user-api.js";
import { AuthLogoutAPI } from "../api/auth-logout-api.js";
import { Store } from "../store/store.js";
import { NotifyService } from "./notify.service.js";
export class AuthService {
    constructor() {
        this.store = Store.getInstance();
        this.authSignInAPI = new AuthSignInAPI();
        this.authSignUpAPI = new AuthSignUpAPI();
        this.authUserAPI = new AuthUserAPI();
        this.authLogoutAPI = new AuthLogoutAPI();
        this.notifyService = NotifyService.getInstance();
        this.logout();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
    login(login, password) {
        const request = { login: login, password: password };
        return this.authSignInAPI.request(request).then(response => {
            let res = response;
            if (res.toLowerCase() === 'ok') {
                return this.setProfile();
            }
            else {
                return false;
            }
        });
    }
    signup(profile) {
        const request = {
            first_name: profile.name,
            second_name: profile.secondName,
            email: profile.email,
            login: profile.login,
            password: profile.password,
            phone: profile.phone
        };
        this.authSignUpAPI.request(request).then(response => {
            let res = response;
            if (res.id) {
                profile.id = res.id;
                this.store.setProfile(profile);
            }
        });
    }
    logout() {
        this.authLogoutAPI.request().then(response => {
            let res = response;
            if (res.toLowerCase() === 'ok') {
                this.cleareProfile();
            }
        });
    }
    setProfile() {
        return this.authUserAPI.request().then(response => {
            this.store.setProfile(response);
            return true;
        });
    }
    cleareProfile() {
        this.store.setProfile(null);
    }
    notify(message) {
        this.notifyService.show({ message: message, time: 5000 });
    }
}
//# sourceMappingURL=auth.service.js.map