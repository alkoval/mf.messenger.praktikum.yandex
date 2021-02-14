import { HttpService } from "../core.js";
export class UserPasswordAPI {
    constructor() {
        this.httpService = new HttpService('api/v2/user');
    }
    request(body) {
        const options = {
            body: body
        };
        return this.httpService.put(`/password`, options);
    }
}
//# sourceMappingURL=user-password-api.js.map