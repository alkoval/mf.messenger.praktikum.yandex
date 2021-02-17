import { APP_HOST } from "../../shared/const/constants";
import { HttpRequestOptions } from "../../shared/shared.interfaces"
import { HttpService } from "../core"
import { FindUserRequest } from "./interfaces/find-user-request"

export class UserSearchAPI {
    private httpService: HttpService;

    constructor() {
        this.httpService = new HttpService(`${APP_HOST}/api/v2/user`);
    }

    public request(body: FindUserRequest): Promise<unknown> {
        const options: HttpRequestOptions = {
            body: JSON.stringify(body)
        }
        return this.httpService.post(`/search`, options);
    }
}