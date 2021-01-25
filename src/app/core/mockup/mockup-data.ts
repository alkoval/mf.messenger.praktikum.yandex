import { PropsComponent } from '../../shared/interfaces/props-component.js';
import { NavItem } from '../../shared/interfaces/nav-item.js';
import { ChatDialog } from '../../shared/models/chat-dialog.js';
import { HistoryMessage } from '../../shared/interfaces/history-message.js';
import { Profile } from '../../shared/models/profile.js';

export class MockupData implements PropsComponent {
    private static instance: MockupData;
    public navItems: NavItem[];
    public previewChatDialogs: ChatDialog[];
    public historyMessages: HistoryMessage[];
    public profile: Profile;

    private constructor() {
        this.navItems = [];
        this.previewChatDialogs = [];
        this.historyMessages = [];
        this.profile = new Profile();
    }

    public static getInstance(): MockupData {
        if (!this.instance) {
            this.instance = new this();
        }

        return this.instance;
    }
}