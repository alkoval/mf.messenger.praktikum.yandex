import { APP_HOST } from "../../shared/const/constants";
import { HttpService } from "../core"

export class ChatArchiveAPI {
    private httpService: HttpService;

    constructor() {
        this.httpService = new HttpService(`${APP_HOST}/api/v2/chats/archive`);
    }

    public request(): Promise<unknown> {
        return this.httpService.get('', null, {});
    }
}