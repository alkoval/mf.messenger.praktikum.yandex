import { AuthSignInAPI } from "../api/auth-signin-api";
import { AuthSignUpAPI } from "../api/auth-signup-api";
import { AuthUserAPI } from "../api/auth-user-api";
import { AuthLogoutAPI } from "../api/auth-logout-api";
import { Profile } from "../../shared/shared.models";
import { SignInRequest } from "../api/interfaces/signin-request";
import { SignUpRequest } from "../api/interfaces/signup-request";
import { SignUpResponse } from "../api/interfaces/signup-response";
import { NotifyService } from "./notify.service";
import { UserResponse } from "../api/interfaces/user-response";

export class AuthService {
  private static instance: AuthService;
  private notifyService: NotifyService;
  private authSignInAPI: AuthSignInAPI;
  private authSignUpAPI: AuthSignUpAPI;
  private authUserAPI: AuthUserAPI;
  private authLogoutAPI: AuthLogoutAPI;

  constructor() {
    this.notifyService = NotifyService.getInstance();
    this.authSignInAPI = new AuthSignInAPI();
    this.authSignUpAPI = new AuthSignUpAPI();
    this.authUserAPI = new AuthUserAPI();
    this.authLogoutAPI = new AuthLogoutAPI();
  }

  public static getInstance(): AuthService {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  public login(login: string, password: string): Promise<unknown> {
    const data: SignInRequest = { login: login, password: password };

    return this.authSignInAPI.request(data).then((response) => {
      const res: string = response as string;
      if (res.toLowerCase() === "ok") {
        return true;
      }

      this.logout();
      this.notifyService.notify(response as string);
      return false;
    });
  }

  public signup(profile: Profile): Promise<unknown> {
    const request: SignUpRequest = {
      first_name: profile.name,
      second_name: profile.secondName,
      email: profile.email,
      login: profile.login,
      password: profile.password,
      phone: profile.phone,
    };
    return this.authSignUpAPI.request(request).then((response) => {
      const res: SignUpResponse = JSON.parse(response as string);
      if (res.id) {
        return res.id;
      }

      this.notifyService.notify(response as string);
    });
  }

  public logout(): Promise<unknown> {
    return this.authLogoutAPI.request().then((response) => {
      const res: string = response as string;
      if (res.toLowerCase() === "ok") {
        return true;
      }

      return false;
    });
  }

  public getInfoUser(): Promise<unknown> {
    return this.authUserAPI.request().then((response) => {
      const userResponse: UserResponse = JSON.parse(response as string);
      return userResponse;
    });
  }
}
