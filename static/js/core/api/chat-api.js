import { HttpService } from "../core.js";
export class ChatAPI {
    constructor() {
        this.httpService = new HttpService('api/v2/chats');
    }
    request() {
        return this.httpService.get('', null, {});
    }
    create(body) {
        let options = {
            body: JSON.stringify(body)
        };
        return this.httpService.post('', options);
    }
    delete(body) {
        let options = {
            body: JSON.stringify(body)
        };
        return this.httpService.delete('', options);
    }
}
//# sourceMappingURL=chat-api.js.map