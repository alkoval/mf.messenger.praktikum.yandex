import { HttpService } from "../core.js";
export class UserAPI {
    constructor() {
        this.httpService = new HttpService('api/v2/user');
    }
    request(id) {
        return this.httpService.get(`/${id}`, null, {});
    }
}
//# sourceMappingURL=user-api.js.map