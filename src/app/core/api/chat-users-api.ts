import { HttpRequestOptions } from "../../shared/shared.interfaces.js";
import { HttpService } from "../core.js";
import { UsersRequest } from "./interfaces/users-request.js";

export class ChatUsersAPI {
    private httpService: HttpService;

    constructor() {
        this.httpService = new HttpService('api/v2/chats/');
    }

    public request(id: number): Promise<unknown> {
        return this.httpService.get(`${id}/users`, null, {});
    }

    public updadate(body: UsersRequest): Promise<unknown> {
        let options: HttpRequestOptions = {
            body: JSON.stringify(body)
        }
        return this.httpService.put('users', options);
    }

    public delete(body: UsersRequest): Promise<unknown> {
        let options: HttpRequestOptions = {
            body: JSON.stringify(body)
        }
        return this.httpService.delete('users', options);
    }
}