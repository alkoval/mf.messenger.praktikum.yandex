import { UserRequest } from "../../core/api/interfaces/user-request.js";
import { UserResponse } from "../../core/api/interfaces/user-response.js";
import { ChangePasswordRequest } from "../../core/api/interfaces/change-password-request.js";
import { UserPasswordAPI } from "../../core/api/user-password-api.js";
import { UserProfileAPI } from "../../core/api/user-profile-api.js";
import { AuthService } from "../../core/core.js";
import { NotifyService } from "../../core/services/notify.service.js";
import { Store } from "../../core/store/store.js";
import { Profile } from "../../shared/shared.models.js";

export class ProfileService {
    private store: Store;
    private authService: AuthService;
    private userProfileAPI: UserProfileAPI;
    private userPasswordAPI: UserPasswordAPI;
    private notifyService: NotifyService;

    constructor() {
        this.store = Store.getInstance();
        this.authService = AuthService.getInstance();
        this.userProfileAPI = new UserProfileAPI();
        this.userPasswordAPI = new UserPasswordAPI();
        this.notifyService = NotifyService.getInstance();
    }

    public async getProfile(): Promise<unknown> {
        if (this.store.getProfile() === null) {
            console.log(this.store.getProfile())
            await this.authService.setProfile();
        }
        return this.store.getProfile();
    }

    public saveProfile(profile: Profile): Promise<unknown> {
        const userRequest: UserRequest = {
            display_name: profile.nickname,
            email: profile.email,
            first_name: profile.name,
            second_name: profile.secondName,
            login: profile.login,
            phone: profile.phone
        }
        return this.userProfileAPI.request(userRequest).then(
            response => {
                const userResponse: UserResponse = JSON.parse(response as string);
                if (userResponse.id) {
                    const profile: Profile = new Profile();

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
                } else {
                    this.notifyService.notify(response as string);
                }
            }
        )
    }

    public changePassword(oldPassword: string, newPassword: string): Promise<unknown> {
        const passwordReq: ChangePasswordRequest = {
            oldPassword: oldPassword,
            newPassword: newPassword
        };
        return this.userPasswordAPI.request(passwordReq).then(
            response => {
                this.notifyService.notify(response as string);
            }
        )
    }
}