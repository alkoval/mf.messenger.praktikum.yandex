import { HttpService } from "../core.js";
export class AuthSignUpAPI {
    constructor() {
        this.httpService = new HttpService('api/v2/auth');
    }
    request(body) {
        let options = {
            body: body
        };
        return this.httpService.post('/signup', options);
    }
}
//# sourceMappingURL=auth-signup-api.js.map