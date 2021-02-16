import { UserPasswordAPI } from "../../core/api/user-password-api.js";
import { UserProfileAPI } from "../../core/api/user-profile-api.js";
import { NotifyService } from "../../core/services/notify.service.js";
import { Profile } from "../../shared/shared.models.js";
import { UserAPI } from "../../core/api/user-api.js";
import { UserSearchAPI } from "../../core/api/user-search-api.js";
import { UserProfileAvatarAPI } from "../../core/api/user-profile-avatar-api.js";
import { EventBus } from "../../core/event-bus/event-bus.js";
import { APP_DEFAULT_IMAGE, APP_HOST } from "../../shared/const/constants.js";
import { AuthService } from "../../core/core.js";
export var PROFILE_EVENTS;
(function (PROFILE_EVENTS) {
    PROFILE_EVENTS["PROFILE_UPDATE"] = "profile-update";
})(PROFILE_EVENTS || (PROFILE_EVENTS = {}));
export class ProfileService {
    constructor() {
        this.eventBus = new EventBus();
        this.profile = null;
        this.notifyService = NotifyService.getInstance();
        this.authService = AuthService.getInstance();
        this.userProfileAPI = new UserProfileAPI();
        this.userProfileAvatarAPI = new UserProfileAvatarAPI();
        this.userPasswordAPI = new UserPasswordAPI();
        this.userAPI = new UserAPI();
        this.userSearchAPI = new UserSearchAPI();
        this.onInit();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
    onInit() {
        this.authService.getInfoUser().then(userInfo => {
            this.setProfile(this.userResToProfile(userInfo));
        });
    }
    subscribe() {
        return this.eventBus;
    }
    getProfile() {
        return this.profile;
    }
    setProfile(profile) {
        this.profile = profile;
        this.eventBus.emit(PROFILE_EVENTS.PROFILE_UPDATE, this.profile);
    }
    getInfoProfile(id) {
        return this.userAPI.request(id).then(user => {
            console.log(user);
            const userResponse = JSON.parse(user);
            if (userResponse.id) {
                this.setProfile(this.userResToProfile(userResponse));
                return true;
            }
            else {
                this.notifyService.notify(user);
                return false;
            }
        });
    }
    saveProfile(profile) {
        const userRequest = {
            display_name: profile.nickname,
            email: profile.email,
            first_name: profile.name,
            second_name: profile.secondName,
            login: profile.login,
            phone: profile.phone
        };
        return this.userProfileAPI.request(userRequest).then(response => {
            const userResponse = JSON.parse(response);
            if (userResponse.id) {
                this.setProfile(this.userResToProfile(userResponse));
                this.notifyService.notify('Данные профиля успешно обновлены');
            }
            else {
                this.notifyService.notify(response);
            }
        });
    }
    changePassword(oldPassword, newPassword) {
        const passwordReq = {
            oldPassword: oldPassword,
            newPassword: newPassword
        };
        return this.userPasswordAPI.request(passwordReq).then(response => {
            this.notifyService.notify(response);
        });
    }
    chageAvatar(avatar) {
        return this.userProfileAvatarAPI.request(avatar).then(response => {
            const userResponse = JSON.parse(response);
            if (userResponse.id) {
                this.setProfile(this.userResToProfile(userResponse));
            }
            else {
                this.notifyService.notify(response);
            }
        });
    }
    userResToProfile(userResponse) {
        const profile = new Profile();
        profile.id = userResponse.id;
        profile.name = userResponse.first_name;
        profile.secondName = userResponse.second_name;
        profile.nickname = userResponse.display_name;
        profile.login = userResponse.login;
        profile.email = userResponse.email;
        profile.phone = userResponse.phone;
        profile.avatar = userResponse.avatar ? `${APP_HOST}/${userResponse.avatar}` : APP_DEFAULT_IMAGE;
        return profile;
    }
    search(login) {
        const find = {
            login: login
        };
        return this.userSearchAPI.request(find).then(response => {
            if (response) {
                const profiles = [];
                const res = JSON.parse(response);
                for (let user of res) {
                    profiles.push(this.userResToProfile(user));
                }
                return profiles;
            }
        });
    }
}
//# sourceMappingURL=profile.service.js.map