import { PropsComponent } from '../../shared/interfaces/props-component.js';
import { NavItem } from '../../shared/interfaces/nav-item.js';
import { PreviewChatDialog } from '../../shared/models/preview-chat-dialog.js';

export class MockupData implements PropsComponent {
    public navItems: NavItem[];
    public previewChatDialogs: PreviewChatDialog[];

    constructor() {
        this.navItems = [];
        this.previewChatDialogs = [];
    }
}