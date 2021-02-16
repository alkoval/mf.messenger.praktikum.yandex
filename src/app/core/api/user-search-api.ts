import { HttpRequestOptions } from "../../shared/shared.interfaces.js";
import { HttpService } from "../core.js";
import { FindUserRequest } from "./interfaces/find-user-request.js";

export class UserSearchAPI {
    private httpService: HttpService;

    constructor() {
        this.httpService = new HttpService('api/v2/user');
    }

    public request(body: FindUserRequest): Promise<unknown> {
        const options: HttpRequestOptions = {
            body: JSON.stringify(body)
        }
        return this.httpService.post(`/search`, options);
    }
}