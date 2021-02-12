import { HttpService } from "../core.js";
export class AuthLogoutAPI {
    constructor() {
        this.httpService = new HttpService('api/v2/auth');
    }
    request() {
        return this.httpService.post('/logout', {});
    }
}
//# sourceMappingURL=auth-logout-api.js.map