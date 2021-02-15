import { Profile } from "../../shared/shared.models.js";
import { EventBus } from "../event-bus/event-bus.js";

export enum STORE_EVENTS {
    USER_UPDATE = 'user-update',
    PROFILE_UPDATE = 'profile-update'
}

export class Store {
    private static instance: Store;
    //@ts-ignore
    private profile: Profile | null;
    private eventBus: EventBus;
    private host: string;
    private defaultImg: string;

    private constructor() {
        this.eventBus = new EventBus();
        this.profile = null;
        this.host = 'https://ya-praktikum.tech';
        this.defaultImg = 'https://i.imgur.com/HnSqZIY.png';
    }

    public static getInstance(): Store {
        if (!this.instance) {
            this.instance = new this();
        }

        return this.instance;
    }

    public subscribe(): EventBus {
        return this.eventBus;
    }

    public setProfile(profile: Profile | null): void {
        this.profile = profile;
        this.eventBus.emit(STORE_EVENTS.PROFILE_UPDATE, this.profile);
    }

    public getProfile(): Profile | null {
        return this.profile;
    }

    public getHost(): string {
        return this.host;
    }

    public getDefImg(): string {
        return this.defaultImg;
    }
}