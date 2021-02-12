import { AuthSignInAPI } from "../api/auth-signin-api.js";
import { AuthUserAPI } from "../api/auth-user-api.js";
import { AuthLogoutAPI } from "../api/auth-logout-api.js";
import { Store } from "../store/store.js";
import { Profile } from "../../shared/shared.models.js";
import { SignInRequest } from "../api/interfaces/signin-request.js";

export class AuthService {
    private static instance: AuthService;
    private store: Store;
    private authSignInAPI: AuthSignInAPI;
    private authUserAPI: AuthUserAPI;
    private authLogoutAPI: AuthLogoutAPI;

    constructor() {
        this.store = Store.getInstance();
        this.authSignInAPI = new AuthSignInAPI();
        this.authUserAPI = new AuthUserAPI();
        this.authLogoutAPI = new AuthLogoutAPI();
    }

    public static getInstance(): AuthService {
        if (!this.instance) {
            this.instance = new this();
        }

        return this.instance;
    }

    public login(login: string, password: string): void {
        const request: SignInRequest = { login: login, password: password };
        this.authSignInAPI.request(request).then(
            response => {
                let res: string = response as string;
                if (res.toLowerCase() === 'ok') {
                    this.setProfile();
                } else {
                    console.log(res)
                }
            }
        )
    }

    public logout(): void {
        this.authLogoutAPI.request().then(
            response => {
                let res: string = response as string;
                if (res.toLowerCase() === 'ok') {
                    this.cleareProfile();
                }
            }
        )
    }

    private setProfile(): void {
        this.authUserAPI.request().then(
            response => {
                console.log(response)
                this.store.setProfile(response as Profile);
            }
        )
    }

    private cleareProfile(): void {
        this.store.setProfile(null);
    }
}