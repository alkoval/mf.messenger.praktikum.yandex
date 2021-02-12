import { AuthSignInAPI } from "../api/auth-signin-api.js";
import { AuthUserAPI } from "../api/auth-user-api.js";
import { AuthLogoutAPI } from "../api/auth-logout-api.js";
import { Store } from "../store/store.js";
export class AuthService {
    constructor() {
        this.store = Store.getInstance();
        this.authSignInAPI = new AuthSignInAPI();
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
        this.authSignInAPI.request(request).then(response => {
            let res = response;
            if (res.toLowerCase() === 'ok') {
                this.setProfile();
            }
            else {
                console.log(res);
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
        this.authUserAPI.request().then(response => {
            console.log(response);
            this.store.setProfile(response);
        });
    }
    cleareProfile() {
        this.store.setProfile(null);
    }
}
//# sourceMappingURL=auth.service.js.map