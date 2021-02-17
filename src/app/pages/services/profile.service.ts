import { UserRequest } from "../../core/api/interfaces/user-request"
import { UserResponse } from "../../core/api/interfaces/user-response"
import { FindUserRequest } from "../../core/api/interfaces/find-user-request"
import { ChangePasswordRequest } from "../../core/api/interfaces/change-password-request"
import { UserPasswordAPI } from "../../core/api/user-password-api"
import { UserProfileAPI } from "../../core/api/user-profile-api"
import { NotifyService } from "../../core/services/notify.service"
import { Profile } from "../../shared/shared.models"
import { UserAPI } from "../../core/api/user-api"
import { UserSearchAPI } from "../../core/api/user-search-api"
import { UserProfileAvatarAPI } from "../../core/api/user-profile-avatar-api"
import { EventBus } from "../../core/event-bus/event-bus"
import { APP_DEFAULT_IMAGE, APP_HOST } from "../../shared/const/constants"
import { AuthService } from "../../core/core"
import { OnInit } from "../../shared/shared.interfaces"

export enum PROFILE_EVENTS {
    PROFILE_UPDATE = 'profile-update',
}

export class ProfileService implements OnInit {
    private static instance: ProfileService;
    private eventBus: EventBus;
    private profile: Profile | null;
    private notifyService: NotifyService;
    private authService: AuthService;
    private userProfileAPI: UserProfileAPI;
    private userProfileAvatarAPI: UserProfileAvatarAPI;
    private userPasswordAPI: UserPasswordAPI;
    private userAPI: UserAPI;
    private userSearchAPI: UserSearchAPI;

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

    public static getInstance(): ProfileService {
        if (!this.instance) {
            this.instance = new this();
        }

        return this.instance;
    }

    public onInit(): void {
        this.authService.getInfoUser().then(
            userInfo => {
                this.setProfile(this.userResToProfile(userInfo as UserResponse));
            }
        )
    }

    public subscribe(): EventBus {
        return this.eventBus;
    }

    public getProfile(): Profile | null {
        return this.profile;
    }

    public setProfile(profile: Profile | null): void {
        this.profile = profile;
        this.eventBus.emit(PROFILE_EVENTS.PROFILE_UPDATE, this.profile);
    }

    public getInfoProfile(id: number): Promise<unknown> {
        return this.userAPI.request(id).then(
            user => {
                console.log(user)
                const userResponse: UserResponse = JSON.parse(user as string);
                if (userResponse.id) {
                    this.setProfile(this.userResToProfile(userResponse));
                    return true;
                } else {
                    this.notifyService.notify(user as string);
                    return false;
                }
            }
        )
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
                    this.setProfile(this.userResToProfile(userResponse));
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
                    this.setProfile(this.userResToProfile(userResponse));
                } else {
                    this.notifyService.notify(response as string);
                }
            }
        )
    }

    public userResToProfile(userResponse: UserResponse): Profile {
        const profile: Profile = new Profile();

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

    public search(login: string): Promise<unknown> {
        const find: FindUserRequest = {
            login: login
        }
        return this.userSearchAPI.request(find).then(
            response => {
                if (response) {
                    const profiles = [];
                    const res: UserResponse[] = JSON.parse(response as string);
                    for (let user of res) {
                        profiles.push(this.userResToProfile(user));
                    }
                    return profiles;
                }
            }
        )
    }
}