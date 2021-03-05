import { APP_HOST } from "../../shared/const/constants";
import { HttpRequestOptions } from "../../shared/shared.interfaces";
import { HttpService } from "../core";
import { SignUpRequest } from "./interfaces/signup-request";

export class AuthSignUpAPI {
  private httpService: HttpService;

  constructor() {
    this.httpService = new HttpService(`${APP_HOST}/api/v2/auth`);
  }

  public request(body: SignUpRequest): Promise<unknown> {
    const options: HttpRequestOptions = {
      body: JSON.stringify(body),
    };
    return this.httpService.post("/signup", options);
  }
}
