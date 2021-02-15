import { HttpRequestOptions } from "../../shared/shared.interfaces.js";
import { HttpService } from "../core.js";
import { CreateChatRequest } from "./interfaces/create-chat-request.js";

export class ChatAPI {
    private httpService: HttpService;

    constructor() {
        this.httpService = new HttpService('api/v2/chats');
    }

    public request(): Promise<unknown> {
        return this.httpService.get('', null, {});
    }

    public create(body: CreateChatRequest): Promise<unknown> {
        let options: HttpRequestOptions = {
            body: JSON.stringify(body)
        }
        return this.httpService.post('', options);
    }
}