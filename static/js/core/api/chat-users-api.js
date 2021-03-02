import { APP_HOST } from "../../shared/const/constants.js";
import { HttpService } from "../core.js";
export class ChatUsersAPI {
    constructor() {
        this.httpService = new HttpService(`${APP_HOST}/api/v2/chats/`);
    }
    request(id) {
        return this.httpService.get(`${id}/users`, null, {});
    }
    updadate(body) {
        let options = {
            body: JSON.stringify(body)
        };
        return this.httpService.put('users', options);
    }
    delete(body) {
        let options = {
            body: JSON.stringify(body)
        };
        return this.httpService.delete('users', options);
    }
}
//# sourceMappingURL=chat-users-api.js.map