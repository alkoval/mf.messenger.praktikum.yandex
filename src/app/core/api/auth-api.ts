import { HttpService } from "../core";
import { BaseAPI } from "./base-api";

export class AuthAPI extends BaseAPI {
    private httpService: HttpService;

    constructor() {
        super();
        this.httpService = new HttpService('/api/v2/auth');
    }

    public request(): Promise<unknown> {
        return this.httpService.get('/user', null, {});
    }
}