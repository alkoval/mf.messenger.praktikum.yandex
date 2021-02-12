import { HttpService } from "../core.js";

export class AuthLogoutAPI {
    private httpService: HttpService;

    constructor() {
        this.httpService = new HttpService('api/v2/auth');
    }

    public request(): Promise<unknown> {
        return this.httpService.post('/logout', {});
    }
}