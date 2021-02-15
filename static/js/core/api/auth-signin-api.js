import { HttpService } from "../core.js";
export class AuthSignInAPI {
    constructor() {
        this.httpService = new HttpService('api/v2/auth');
    }
    request(body) {
        let options = {
            body: JSON.stringify(body)
        };
        return this.httpService.post('/signin', options);
    }
}
//# sourceMappingURL=auth-signin-api.js.map