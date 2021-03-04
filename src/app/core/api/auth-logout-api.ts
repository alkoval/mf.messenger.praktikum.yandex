import { APP_HOST } from "../../shared/const/constants";
import { HttpService } from "../core";

export class AuthLogoutAPI {
  private httpService: HttpService;

  constructor() {
    this.httpService = new HttpService(`${APP_HOST}/api/v2/auth`);
  }

  public request(): Promise<unknown> {
    return this.httpService.post("/logout", {});
  }
}
