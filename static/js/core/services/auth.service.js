import { AuthSignInAPI } from "../api/auth-signin-api.js";
import { AuthSignUpAPI } from "../api/auth-signup-api.js";
import { AuthUserAPI } from "../api/auth-user-api.js";
import { AuthLogoutAPI } from "../api/auth-logout-api.js";
import { NotifyService } from "./notify.service.js";
export class AuthService {
    constructor() {
        this.notifyService = NotifyService.getInstance();
        this.authSignInAPI = new AuthSignInAPI();
        this.authSignUpAPI = new AuthSignUpAPI();
        this.authUserAPI = new AuthUserAPI();
        this.authLogoutAPI = new AuthLogoutAPI();
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
                return true;
            }
            else {
                this.logout();
                this.notifyService.notify(response);
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
        return this.authSignUpAPI.request(request).then(response => {
            let res = JSON.parse(response);
            if (res.id) {
                return res.id;
            }
            else {
                this.notifyService.notify(response);
            }
        });
    }
    logout() {
        return this.authLogoutAPI.request().then(response => {
            let res = response;
            if (res.toLowerCase() === 'ok') {
                return true;
            }
            else {
                return false;
            }
        });
    }
    getInfoUser() {
        return this.authUserAPI.request().then(response => {
            const userResponse = JSON.parse(response);
            return userResponse;
        });
    }
}
//# sourceMappingURL=auth.service.js.map