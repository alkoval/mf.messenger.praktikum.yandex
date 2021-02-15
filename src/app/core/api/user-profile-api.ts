import { HttpRequestOptions } from "../../shared/shared.interfaces.js";
import { HttpService } from "../core.js";
import { UserRequest } from "./interfaces/user-request.js";

export class UserProfileAPI {
    private httpService: HttpService;

    constructor() {
        this.httpService = new HttpService('api/v2/user');
    }

    public request(body: UserRequest): Promise<unknown> {
        const options: HttpRequestOptions = {
            body: JSON.stringify(body)
        }
        return this.httpService.put(`/profile`, options);
    }
}