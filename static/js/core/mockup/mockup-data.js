export class MockupData {
    constructor() {
        this.navItems = [];
        this.previewChatDialogs = [];
        this.historyMessages = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
}
//# sourceMappingURL=mockup-data.js.map