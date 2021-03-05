import { APP_HOST } from "../../shared/const/constants";
import { HttpRequestOptions } from "../../shared/shared.interfaces";
import { HttpService } from "../core";
import { ChangePasswordRequest } from "./interfaces/change-password-request";

export class UserPasswordAPI {
  private httpService: HttpService;

  constructor() {
    this.httpService = new HttpService(`${APP_HOST}/api/v2/user`);
  }

  public request(body: ChangePasswordRequest): Promise<unknown> {
    const options: HttpRequestOptions = {
      body: JSON.stringify(body),
    };
    return this.httpService.put("/password", options);
  }
}
