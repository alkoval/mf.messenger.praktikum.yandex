import { HttpRequestOptions } from "../../shared/shared.interfaces.js";
import { HttpService } from "../core.js";
import { ChangePasswordRequest } from "./interfaces/change-password-request.js";

export class UserPasswordAPI {
    private httpService: HttpService;

    constructor() {
        this.httpService = new HttpService('api/v2/user');
    }

    public request(body: ChangePasswordRequest): Promise<unknown> {
        const options: HttpRequestOptions = {
            body: body
        }
        return this.httpService.put(`/password`, options);
    }
}