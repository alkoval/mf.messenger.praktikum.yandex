import { APP_HOST } from "../../shared/const/constants";
import { HttpRequestOptions, XhrHeader } from "../../shared/shared.interfaces";
import { HttpService } from "../core";

export class UserProfileAvatarAPI {
  private httpService: HttpService;
  private headers: XhrHeader;

  constructor() {
    this.httpService = new HttpService(`${APP_HOST}/api/v2/user/profile`);
    this.headers = {
      Accept: "application/json, text/javascript, text/plain",
    };
  }

  public request(avatar: FormData): Promise<unknown> {
    const options: HttpRequestOptions = {
      headers: this.headers,
      body: avatar,
    };
    return this.httpService.put("/avatar", options);
  }
}
