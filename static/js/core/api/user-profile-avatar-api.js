import { HttpService } from "../core.js";
export class UserProfileAvatarAPI {
    constructor() {
        this.httpService = new HttpService('api/v2/user/profile');
        this.headers = {
            'Accept': 'application/json, text/javascript, text/plain',
        };
    }
    request(avatar) {
        const options = {
            headers: this.headers,
            body: avatar
        };
        return this.httpService.put(`/avatar`, options);
    }
}
//# sourceMappingURL=user-profile-avatar-api.js.map