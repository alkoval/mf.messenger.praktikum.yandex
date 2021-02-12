import { HttpService } from "../core";
import { BaseAPI } from "./base-api";
export class AuthAPI extends BaseAPI {
    constructor() {
        super();
        this.httpService = new HttpService('/api/v2/auth');
    }
    request() {
        return this.httpService.get('/user', null, {});
    }
}
//# sourceMappingURL=auth-api.js.map