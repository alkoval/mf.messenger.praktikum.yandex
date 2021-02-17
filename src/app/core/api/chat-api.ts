import { APP_HOST } from "../../shared/const/constants";
import { HttpRequestOptions } from "../../shared/shared.interfaces"
import { HttpService } from "../core"
import { ChatDeleteRequest } from "./interfaces/chat-delete-request"
import { CreateChatRequest } from "./interfaces/create-chat-request"

export class ChatAPI {
    private httpService: HttpService;

    constructor() {
        this.httpService = new HttpService(`${APP_HOST}/api/v2/chats`);
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

    public delete(body: ChatDeleteRequest): Promise<unknown> {
        let options: HttpRequestOptions = {
            body: JSON.stringify(body)
        }
        return this.httpService.delete('', options);
    }
}