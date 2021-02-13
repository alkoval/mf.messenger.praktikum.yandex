import { AuthSignInAPI } from "../api/auth-signin-api.js";
import { AuthSignUpAPI } from "../api/auth-signup-api.js";
import { AuthUserAPI } from "../api/auth-user-api.js";
import { AuthLogoutAPI } from "../api/auth-logout-api.js";
import { Store } from "../store/store.js";
import { Profile } from "../../shared/shared.models.js";
import { SignInRequest } from "../api/interfaces/signin-request.js";
import { SignUpRequest } from "../api/interfaces/signup-request.js";
import { SignUpResponse } from "../api/interfaces/signup-response.js";
import { NotifyService } from "./notify.service.js";

export class AuthService {
    private static instance: AuthService;
    private store: Store;
    private authSignInAPI: AuthSignInAPI;
    private authSignUpAPI: AuthSignUpAPI;
    private authUserAPI: AuthUserAPI;
    private authLogoutAPI: AuthLogoutAPI;
    private notifyService: NotifyService;

    constructor() {
        this.store = Store.getInstance();
        this.authSignInAPI = new AuthSignInAPI();
        this.authSignUpAPI = new AuthSignUpAPI();
        this.authUserAPI = new AuthUserAPI();
        this.authLogoutAPI = new AuthLogoutAPI();
        this.notifyService = NotifyService.getInstance();
        this.logout();
    }

    public static getInstance(): AuthService {
        if (!this.instance) {
            this.instance = new this();
        }

        return this.instance;
    }

    public login(login: string, password: string): Promise<unknown> {
        const request: SignInRequest = { login: login, password: password };

        return this.authSignInAPI.request(request).then(
            response => {
                let res: string = response as string;
                if (res.toLowerCase() === 'ok') {
                    return this.setProfile();
                } else {
                    return false;
                }
            }
        );
    }

    public signup(profile: Profile): Promise<unknown> {
        const request: SignUpRequest = {
            first_name: profile.name,
            second_name: profile.secondName,
            email: profile.email,
            login: profile.login,
            password: profile.password,
            phone: profile.phone
        };
        return this.authSignUpAPI.request(request).then(
            response => {
                let res: SignUpResponse = response as SignUpResponse;
                if (res.id) {
                    profile.id = res.id;
                    this.store.setProfile(profile);
                    return true;
                }
            }
        );

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

    private setProfile(): Promise<unknown> {
        return this.authUserAPI.request().then(
            response => {
                this.store.setProfile(response as Profile);
                return true;
            }
        )
    }

    private cleareProfile(): void {
        this.store.setProfile(null);
    }

    private notify(message: string): void {
        this.notifyService.show({ message: message, time: 5000 });
    }
}