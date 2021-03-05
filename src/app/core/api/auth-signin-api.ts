import { APP_HOST } from "../../shared/const/constants";
import { HttpRequestOptions } from "../../shared/shared.interfaces";
import { HttpService } from "../core";
import { SignInRequest } from "./interfaces/signin-request";

export class AuthSignInAPI {
  private httpService: HttpService;

  constructor() {
    this.httpService = new HttpService(`${APP_HOST}/api/v2/auth`);
  }

  public request(body: SignInRequest): Promise<unknown> {
    const options: HttpRequestOptions = {
      body: JSON.stringify(body),
    };
    return this.httpService.post("/signin", options);
  }
}
