import { PropsComponent } from '../../shared/interfaces/props-component.js';
import { NavItem } from '../../shared/interfaces/nav-item.js';
import { ChatDialog } from '../../shared/models/chat-dialog.js';
import { HistoryMessage } from '../../shared/interfaces/history-message.js';

export class MockupData implements PropsComponent {
    private static instance: MockupData;
    public navItems: NavItem[];
    public previewChatDialogs: ChatDialog[];
    public historyMessages: HistoryMessage[];

    private constructor() {
        this.navItems = [];
        this.previewChatDialogs = [];
        this.historyMessages = [];
    }

    public static getInstance(): MockupData {
        if (!this.instance) {
            this.instance = new this();
        }

        return this.instance;
    }
}