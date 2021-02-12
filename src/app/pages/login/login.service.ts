import { AuthSignInAPI } from "../../core/api/auth-sigin-api.js";
import { SignInRequest } from "../../core/api/interfaces/signin-request.js";
import { STORE_EVENTS, Store } from "../../core/store/store.js";

export class LoginService {
    private store: Store;
    private authSignInAPI: AuthSignInAPI;

    constructor() {
        this.store = Store.getInstance();
        this.authSignInAPI = new AuthSignInAPI();
        this.registerEvents();
    }

    private registerEvents(): void {
        this.store.subscribe().on(STORE_EVENTS.PROFILE_UPDATE, this.profileUpdated.bind(this));
    }

    public profileUpdated(): void {
        console.log('profileUpdated')
    }

    public login(login: string, password: string): void {
        const request: SignInRequest = { login: login, password: password };
        this.authSignInAPI.request(request).then(
            response => {
                console.log(response);
            }
        )
    }
}