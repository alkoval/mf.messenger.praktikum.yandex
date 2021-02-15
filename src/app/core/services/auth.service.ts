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
import { UserResponse } from "../api/interfaces/user-response.js";
import { UserAPI } from "../api/user-api.js";

export class AuthService {
    private static instance: AuthService;
    private store: Store;
    private notifyService: NotifyService;
    private authSignInAPI: AuthSignInAPI;
    private authSignUpAPI: AuthSignUpAPI;
    private authUserAPI: AuthUserAPI;
    private authLogoutAPI: AuthLogoutAPI;
    private userAPI: UserAPI;

    constructor() {
        this.store = Store.getInstance();
        this.notifyService = NotifyService.getInstance();
        this.authSignInAPI = new AuthSignInAPI();
        this.authSignUpAPI = new AuthSignUpAPI();
        this.authUserAPI = new AuthUserAPI();
        this.authLogoutAPI = new AuthLogoutAPI();
        this.userAPI = new UserAPI();
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
                    this.logout();
                    this.notifyService.notify(response as string);
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
                let res: SignUpResponse = JSON.parse(response as string);
                if (res.id) {
                    return res.id;
                } else {
                    this.notifyService.notify(response as string);
                }
            }
        );

    }

    public logout(): Promise<unknown> {
        return this.authLogoutAPI.request().then(
            response => {
                let res: string = response as string;
                if (res.toLowerCase() === 'ok') {
                    this.cleareProfile();
                    return true;
                } else {
                    return false;
                }
            }
        )
    }

    public setProfile(): Promise<unknown> {
        return this.authUserAPI.request().then(
            response => {
                const userResponse: UserResponse = JSON.parse(response as string);
                const profile: Profile = new Profile();

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
            }
        )
    }

    private cleareProfile(): void {
        this.store.setProfile(null);
    }
}