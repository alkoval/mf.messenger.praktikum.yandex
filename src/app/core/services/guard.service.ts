import { ProfileService } from "../../pages/services/profile.service";

export enum GUARDS {
  PROFILE = "profile",
}

export class GuardService {
  private profileService: ProfileService;

  constructor() {
    this.profileService = ProfileService.getInstance();
  }

  public check(path: string, guard: string): string {
    if (guard === GUARDS.PROFILE) {
      return this.checkProfile() ? path : "./login";
    }

    return path;
  }

  private checkProfile(): boolean {
    console.log("guard " + this.profileService.getProfile());
    return Boolean(this.profileService.getProfile());
  }
}
