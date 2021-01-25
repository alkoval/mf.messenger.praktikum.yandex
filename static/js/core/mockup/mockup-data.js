import { Profile } from '../../shared/models/profile.js';
export class MockupData {
    constructor() {
        this.navItems = [];
        this.previewChatDialogs = [];
        this.historyMessages = [];
        this.profile = new Profile();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
}
//# sourceMappingURL=mockup-data.js.map