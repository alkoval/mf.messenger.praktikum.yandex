import { HttpRequestOptions } from "../../shared/shared.interfaces.js";
import { HttpService } from "../core.js";
import { UserRequest } from "./interfaces/user-request.js";

export class UserProfileAPI {
    private httpService: HttpService;

    constructor() {
        this.httpService = new HttpService('api/v2/user');
    }

    public request(userRequest: UserRequest): Promise<unknown> {
        const options: HttpRequestOptions = {
            body: userRequest
        }
        return this.httpService.put(`/profile`, options);
    }
}