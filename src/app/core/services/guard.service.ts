import { Store } from "../store/store.js";

export enum GUARDS {
    PROFILE = "profile"
}

export class GuardService {
    private store: Store;

    constructor() {
        this.store = Store.getInstance();
    }

    public check(path: string, guard: string): string {
        if (guard === GUARDS.PROFILE) {
            return this.checkProfile() ? path : './login';
        }
        return path;
    }

    private checkProfile(): boolean {
        console.log('guard ' + this.store.getProfile())
        return this.store.getProfile() ? true : false;
    }
}