import { HttpService } from "../core"

export class ChatArchiveAPI {
    private httpService: HttpService;

    constructor() {
        this.httpService = new HttpService('api/v2/chats/archive');
    }

    public request(): Promise<unknown> {
        return this.httpService.get('', null, {});
    }
}