import { APP_HOST } from "../../shared/const/constants.js";
import { HttpService } from "../core.js";
export class ChatArchiveAPI {
    constructor() {
        this.httpService = new HttpService(`${APP_HOST}/api/v2/chats/archive`);
    }
    request() {
        return this.httpService.get('', null, {});
    }
}
//# sourceMappingURL=chat-archive-api.js.map