import { APP_HOST } from "../../shared/const/constants.js";
import { HttpService } from "../core.js";
export class AuthUserAPI {
    constructor() {
        this.httpService = new HttpService(`${APP_HOST}/api/v2/auth`);
    }
    request() {
        return this.httpService.get('/user', null, {});
    }
}
//# sourceMappingURL=auth-user-api.js.map