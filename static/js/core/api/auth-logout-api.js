import { APP_HOST } from "../../shared/const/constants.js";
import { HttpService } from "../core.js";
export class AuthLogoutAPI {
    constructor() {
        this.httpService = new HttpService(`${APP_HOST}/api/v2/auth`);
    }
    request() {
        return this.httpService.post('/logout', {});
    }
}
//# sourceMappingURL=auth-logout-api.js.map