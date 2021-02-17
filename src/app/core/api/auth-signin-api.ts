import { HttpRequestOptions } from "../../shared/shared.interfaces"
import { HttpService } from "../core"
import { SignInRequest } from "./interfaces/signin-request"

export class AuthSignInAPI {
    private httpService: HttpService;

    constructor() {
        this.httpService = new HttpService('api/v2/auth');
    }

    public request(body: SignInRequest): Promise<unknown> {
        let options: HttpRequestOptions = {
            body: JSON.stringify(body)
        }
        return this.httpService.post('/signin', options);
    }
}