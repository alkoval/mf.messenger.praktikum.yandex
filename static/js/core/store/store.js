import { EventBus } from "../event-bus/event-bus.js";
export var STORE_EVENTS;
(function (STORE_EVENTS) {
    STORE_EVENTS["PROFILE_UPDATE"] = "profile-update";
    STORE_EVENTS["DIALOGS_RELOAD"] = "dialogs-reload";
})(STORE_EVENTS || (STORE_EVENTS = {}));
export class Store {
    constructor() {
        this.eventBus = new EventBus();
        this.profile = null;
        this.host = 'https://ya-praktikum.tech';
        this.defaultImg = 'https://i.imgur.com/HnSqZIY.png';
        this.dialogs = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
    subscribe() {
        return this.eventBus;
    }
    setProfile(profile) {
        this.profile = profile;
        this.eventBus.emit(STORE_EVENTS.PROFILE_UPDATE, this.profile);
    }
    getProfile() {
        return this.profile;
    }
    getHost() {
        return this.host;
    }
    getDefImg() {
        return this.defaultImg;
    }
    setDialogs(dialogs) {
        this.dialogs = dialogs;
        console.log(this.dialogs);
        this.eventBus.emit(STORE_EVENTS.DIALOGS_RELOAD, this.dialogs);
    }
    getDialogs() {
        return this.dialogs;
    }
}
//# sourceMappingURL=store.js.map