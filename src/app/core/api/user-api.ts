import { HttpService } from "../core.js";

export class UserAPI {
    private httpService: HttpService;

    constructor() {
        this.httpService = new HttpService('api/v2/user');
    }

    public request(id: number): Promise<unknown> {
        return this.httpService.get(`/${id}`, null, {});
    }
}