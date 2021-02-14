import { Store } from "../store/store.js";
export var GUARDS;
(function (GUARDS) {
    GUARDS["PROFILE"] = "profile";
})(GUARDS || (GUARDS = {}));
export class GuardService {
    constructor() {
        this.store = Store.getInstance();
    }
    check(path, guard) {
        if (guard === GUARDS.PROFILE) {
            return this.checkProfile() ? path : './login';
        }
        return path;
    }
    checkProfile() {
        console.log('guard ' + this.store.getProfile());
        return this.store.getProfile() ? true : false;
    }
}
//# sourceMappingURL=guard.service.js.map