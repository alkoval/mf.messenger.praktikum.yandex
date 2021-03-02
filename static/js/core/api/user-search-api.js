import { APP_HOST } from "../../shared/const/constants.js";
import { HttpService } from "../core.js";
export class UserSearchAPI {
    constructor() {
        this.httpService = new HttpService(`${APP_HOST}/api/v2/user`);
    }
    request(body) {
        const options = {
            body: JSON.stringify(body)
        };
        return this.httpService.post(`/search`, options);
    }
}
//# sourceMappingURL=user-search-api.js.map