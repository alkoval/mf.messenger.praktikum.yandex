var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserPasswordAPI } from "../../core/api/user-password-api.js";
import { UserProfileAPI } from "../../core/api/user-profile-api.js";
import { AuthService } from "../../core/core.js";
import { NotifyService } from "../../core/services/notify.service.js";
import { Store } from "../../core/store/store.js";
import { Profile } from "../../shared/shared.models.js";
import { UserAPI } from "../../core/api/user-api.js";
export class ProfileService {
    constructor() {
        this.store = Store.getInstance();
        this.authService = AuthService.getInstance();
        this.notifyService = NotifyService.getInstance();
        this.userProfileAPI = new UserProfileAPI();
        this.userPasswordAPI = new UserPasswordAPI();
        this.userAPI = new UserAPI();
    }
    getProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.store.getProfile() === null) {
                console.log(this.store.getProfile());
                yield this.authService.setProfile();
            }
            return this.store.getProfile();
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
                const profile = new Profile();
                profile.id = userResponse.id;
                profile.name = userResponse.first_name;
                profile.secondName = userResponse.second_name;
                profile.nickname = userResponse.display_name;
                profile.login = userResponse.login;
                profile.email = userResponse.email;
                profile.phone = userResponse.phone;
                profile.avatar = userResponse.avatar ? userResponse.avatar : 'rick_avatar.png';
                this.store.setProfile(profile);
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
    siginUp(profile) {
        return this.authService.signup(profile).then(id => {
            console.log(id);
            return this.userAPI.request(id).then(user => {
                console.log(user);
                const userResponse = JSON.parse(user);
                if (userResponse.id) {
                    const profile = new Profile();
                    profile.id = userResponse.id;
                    profile.name = userResponse.first_name;
                    profile.secondName = userResponse.second_name;
                    profile.nickname = userResponse.display_name;
                    profile.login = userResponse.login;
                    profile.email = userResponse.email;
                    profile.phone = userResponse.phone;
                    profile.avatar = userResponse.avatar ? userResponse.avatar : 'rick_avatar.png';
                    this.store.setProfile(profile);
                    return true;
                }
                else {
                    this.notifyService.notify(user);
                    return false;
                }
            });
        });
    }
}
//# sourceMappingURL=profile.service.js.map