import { APP_HOST } from "../../shared/const/constants";
import { HttpService } from "../core";

export class UserAPI {
  private httpService: HttpService;

  constructor() {
    this.httpService = new HttpService(`${APP_HOST}/api/v2/user`);
  }

  public request(id: number): Promise<unknown> {
    return this.httpService.get(`/${id}`, null, {});
  }
}
