import { APP_HOST } from "../../shared/const/constants";
import { HttpRequestOptions } from "../../shared/shared.interfaces";
import { HttpService } from "../core";
import { UsersRequest } from "./interfaces/users-request";

export class ChatUsersAPI {
  private httpService: HttpService;

  constructor() {
    this.httpService = new HttpService(`${APP_HOST}/api/v2/chats/`);
  }

  public request(id: number): Promise<unknown> {
    return this.httpService.get(`${id}/users`, null, {});
  }

  public updadate(body: UsersRequest): Promise<unknown> {
    const options: HttpRequestOptions = {
      body: JSON.stringify(body),
    };
    return this.httpService.put("users", options);
  }

  public delete(body: UsersRequest): Promise<unknown> {
    const options: HttpRequestOptions = {
      body: JSON.stringify(body),
    };
    return this.httpService.delete("users", options);
  }
}
