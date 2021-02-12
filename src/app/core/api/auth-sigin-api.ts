import { HttpRequestOptions } from "../../shared/shared.interfaces.js";
import { HttpService } from "../core.js";
import { SignInRequest } from "./interfaces/signin-request.js";

export class AuthSignInAPI {
    private httpService: HttpService;

    constructor() {
        this.httpService = new HttpService('/api/v2/auth');
    }

    public request(body: SignInRequest): Promise<unknown> {
        let options: HttpRequestOptions = {
            body: body
        }
        return this.httpService.post('/user', options);
    }
}