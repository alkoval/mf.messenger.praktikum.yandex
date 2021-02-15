import { AuthSignInAPI } from "../api/auth-signin-api.js";
import { AuthSignUpAPI } from "../api/auth-signup-api.js";
import { AuthUserAPI } from "../api/auth-user-api.js";
import { AuthLogoutAPI } from "../api/auth-logout-api.js";
import { Store } from "../store/store.js";
import { Profile } from "../../shared/shared.models.js";
import { NotifyService } from "./notify.service.js";
import { UserAPI } from "../api/user-api.js";
export class AuthService {
    constructor() {
        this.store = Store.getInstance();
        this.notifyService = NotifyService.getInstance();
        this.authSignInAPI = new AuthSignInAPI();
        this.authSignUpAPI = new AuthSignUpAPI();
        this.authUserAPI = new AuthUserAPI();
        this.authLogoutAPI = new AuthLogoutAPI();
        this.userAPI = new UserAPI();
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
                this.cleareProfile();
                return true;
            }
            else {
                return false;
            }
        });
    }
    setProfile() {
        return this.authUserAPI.request().then(response => {
            const userResponse = JSON.parse(response);
            const profile = new Profile();
            profile.id = userResponse.id;
            profile.name = userResponse.first_name;
            profile.secondName = userResponse.second_name;
            profile.nickname = userResponse.display_name;
            profile.login = userResponse.login;
            profile.email = userResponse.email;
            profile.phone = userResponse.phone;
            profile.avatar = userResponse.avatar ? `${this.store.getHost()}/${userResponse.avatar}` : this.store.getDefImg();
            this.store.setProfile(profile);
            return true;
        });
    }
    cleareProfile() {
        this.store.setProfile(null);
    }
}
//# sourceMappingURL=auth.service.js.map