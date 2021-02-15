import { UserRequest } from "../../core/api/interfaces/user-request.js";
import { UserResponse } from "../../core/api/interfaces/user-response.js";
import { ChangePasswordRequest } from "../../core/api/interfaces/change-password-request.js";
import { UserPasswordAPI } from "../../core/api/user-password-api.js";
import { UserProfileAPI } from "../../core/api/user-profile-api.js";
import { AuthService } from "../../core/core.js";
import { NotifyService } from "../../core/services/notify.service.js";
import { Store } from "../../core/store/store.js";
import { Profile } from "../../shared/shared.models.js";
import { UserAPI } from "../../core/api/user-api.js";
import { UserProfileAvatarAPI } from "../../core/api/user-profile-avatar-api.js";

export class ProfileService {
    private store: Store;
    private authService: AuthService;
    private notifyService: NotifyService;
    private userProfileAPI: UserProfileAPI;
    private userProfileAvatarAPI: UserProfileAvatarAPI;
    private userPasswordAPI: UserPasswordAPI;
    private userAPI: UserAPI;

    constructor() {
        this.store = Store.getInstance();
        this.authService = AuthService.getInstance();
        this.notifyService = NotifyService.getInstance();
        this.userProfileAPI = new UserProfileAPI();
        this.userProfileAvatarAPI = new UserProfileAvatarAPI();
        this.userPasswordAPI = new UserPasswordAPI();
        this.userAPI = new UserAPI();
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
                    this.store.setProfile(this.userResToProfile(userResponse));
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

    public chageAvatar(avatar: FormData): Promise<unknown> {
        return this.userProfileAvatarAPI.request(avatar).then(
            response => {
                const userResponse: UserResponse = JSON.parse(response as string);
                if (userResponse.id) {
                    this.store.setProfile(this.userResToProfile(userResponse));
                } else {
                    this.notifyService.notify(response as string);
                }
            }
        )
    }

    public siginUp(profile: Profile): Promise<unknown> {
        return this.authService.signup(profile).then(
            id => {
                console.log(id)
                return this.userAPI.request(id as number).then(
                    user => {
                        console.log(user)
                        const userResponse: UserResponse = JSON.parse(user as string);
                        if (userResponse.id) {
                            this.store.setProfile(this.userResToProfile(userResponse));
                            return true;
                        } else {
                            this.notifyService.notify(user as string);
                            return false;
                        }
                    }
                )
            }
        )
    }

    private userResToProfile(userResponse: UserResponse): Profile {
        const profile: Profile = new Profile();

        profile.id = userResponse.id;
        profile.name = userResponse.first_name;
        profile.secondName = userResponse.second_name;
        profile.nickname = userResponse.display_name;
        profile.login = userResponse.login;
        profile.email = userResponse.email;
        profile.phone = userResponse.phone;
        profile.avatar = userResponse.avatar ? `${this.store.getHost()}/${userResponse.avatar}` : this.store.getDefImg();

        return profile;
    }
}