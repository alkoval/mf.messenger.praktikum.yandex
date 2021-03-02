import { APP_HOST } from "../../shared/const/constants.js";
import { HttpService } from "../core.js";
export class AuthSignInAPI {
    constructor() {
        this.httpService = new HttpService(`${APP_HOST}/api/v2/auth`);
    }
    request(body) {
        let options = {
            body: JSON.stringify(body)
        };
        return this.httpService.post('/signin', options);
    }
}
//# sourceMappingURL=auth-signin-api.js.map