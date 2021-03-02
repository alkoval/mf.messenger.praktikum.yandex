import { APP_HOST } from "../../shared/const/constants.js";
import { HttpService } from "../core.js";
export class ChatTokenAPI {
    constructor() {
        this.httpService = new HttpService('');
    }
    request(id) {
        this.httpService.setHost(`${APP_HOST}/api/v2/chats/token/${id}`);
        return this.httpService.post('', {});
    }
}
//# sourceMappingURL=chat-token-api.js.map