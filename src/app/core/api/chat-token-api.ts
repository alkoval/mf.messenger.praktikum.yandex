import { APP_HOST } from "../../shared/const/constants";
import { HttpService } from "../core";

export class ChatTokenAPI {
    private httpService: HttpService;

    constructor() {
        this.httpService = new HttpService('');
    }

    public request(id: number): Promise<unknown> {
        this.httpService.setHost(`${APP_HOST}/api/v2/chats/token/${id}`);
        return this.httpService.post('', {});
    }
}