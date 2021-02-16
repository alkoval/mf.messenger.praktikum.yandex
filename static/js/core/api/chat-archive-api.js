import { HttpService } from "../core.js";
export class ChatArchiveAPI {
    constructor() {
        this.httpService = new HttpService('api/v2/chats/archive');
    }
    request() {
        return this.httpService.get('', null, {});
    }
}
//# sourceMappingURL=chat-archive-api.js.map