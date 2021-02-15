import { ProfileService } from "../../pages/services/profile.service.js";
export var GUARDS;
(function (GUARDS) {
    GUARDS["PROFILE"] = "profile";
})(GUARDS || (GUARDS = {}));
export class GuardService {
    constructor() {
        this.profileService = ProfileService.getInstance();
    }
    check(path, guard) {
        if (guard === GUARDS.PROFILE) {
            return this.checkProfile() ? path : './login';
        }
        return path;
    }
    checkProfile() {
        console.log('guard ' + this.profileService.getProfile());
        return this.profileService.getProfile() ? true : false;
    }
}
//# sourceMappingURL=guard.service.js.map