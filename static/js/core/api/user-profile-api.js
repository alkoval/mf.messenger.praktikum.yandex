import { HttpService } from "../core.js";
export class UserProfileAPI {
    constructor() {
        this.httpService = new HttpService('api/v2/user');
    }
    request(body) {
        const options = {
            body: JSON.stringify(body)
        };
        return this.httpService.put(`/profile`, options);
    }
}
//# sourceMappingURL=user-profile-api.js.map