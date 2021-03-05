import { APP_HOST } from "../../shared/const/constants";
import { HttpRequestOptions } from "../../shared/shared.interfaces";
import { HttpService } from "../core";
import { UserRequest } from "./interfaces/user-request";

export class UserProfileAPI {
  private httpService: HttpService;

  constructor() {
    this.httpService = new HttpService(`${APP_HOST}/api/v2/user`);
  }

  public request(body: UserRequest): Promise<unknown> {
    const options: HttpRequestOptions = {
      body: JSON.stringify(body),
    };
    return this.httpService.put("/profile", options);
  }
}
