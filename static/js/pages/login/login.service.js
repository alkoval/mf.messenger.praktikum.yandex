import { AuthSignInAPI } from "../../core/api/auth-sigin-api.js";
import { STORE_EVENTS, Store } from "../../core/store/store.js";
export class LoginService {
    constructor() {
        this.store = Store.getInstance();
        this.authSignInAPI = new AuthSignInAPI();
        this.registerEvents();
    }
    registerEvents() {
        this.store.subscribe().on(STORE_EVENTS.PROFILE_UPDATE, this.profileUpdated.bind(this));
    }
    profileUpdated() {
        console.log('profileUpdated');
    }
    login(login, password) {
        const request = { login: login, password: password };
        this.authSignInAPI.request(request).then(response => {
            console.log(response);
        });
    }
}
//# sourceMappingURL=login.service.js.map