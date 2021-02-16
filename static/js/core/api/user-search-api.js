import { HttpService } from "../core.js";
export class UserSearchAPI {
    constructor() {
        this.httpService = new HttpService('api/v2/user');
    }
    request(body) {
        const options = {
            body: JSON.stringify(body)
        };
        return this.httpService.post(`/search`, options);
    }
}
//# sourceMappingURL=user-search-api.js.map