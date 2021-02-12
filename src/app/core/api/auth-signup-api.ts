import { HttpRequestOptions } from "../../shared/shared.interfaces.js";
import { Profile } from "../../shared/shared.models.js";
import { HttpService } from "../core.js";

export class AuthSignInAPI {
    private httpService: HttpService;

    constructor() {
        this.httpService = new HttpService('api/v2/auth');
    }

    public request(body: Profile): Promise<unknown> {
        let options: HttpRequestOptions = {
            body: body
        }
        return this.httpService.post('/signup', options);
    }
}