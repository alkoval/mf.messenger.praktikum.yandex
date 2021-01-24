import { PreviewChatDialog } from '../../shared/models/preview-chat-dialog.js';
import { MockupData } from '../mockup/mockup-data.js';
import NavServise from './nav.service.js';

export default class BootstrapService {
    private navServise: NavServise;
    public mockupData: MockupData;

    constructor(navServise: NavServise) {
        this.navServise = navServise;
        this.mockupData = new MockupData();
        this.init();
    }

    private init(): void {
        this.prepaireMockupNavItems();
        this.prepaireMockupPreviewChatDialogs();
    }

    private prepaireMockupNavItems(): void {
        this.mockupData.navItems = this.navServise.getNavItems();
    }

    private prepaireMockupPreviewChatDialogs(): void {
        this.mockupData.previewChatDialogs.push(new PreviewChatDialog(1, 'avatar.png', 'Lorem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new PreviewChatDialog(1, 'avatar.png', 'Lorem 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 6));
        this.mockupData.previewChatDialogs.push(new PreviewChatDialog(1, 'avatar.png', 'Lorem 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new PreviewChatDialog(1, 'avatar.png', 'Lorem 4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new PreviewChatDialog(1, 'avatar.png', 'Lorem 5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new PreviewChatDialog(1, 'avatar.png', 'Lorem 6', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 8));
        this.mockupData.previewChatDialogs.push(new PreviewChatDialog(1, 'avatar.png', 'Lorem 7', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new PreviewChatDialog(1, 'avatar.png', 'Lorem 8', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 2));
        this.mockupData.previewChatDialogs.push(new PreviewChatDialog(1, 'avatar.png', 'Lorem 9', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new PreviewChatDialog(1, 'avatar.png', 'Lorem 10', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new PreviewChatDialog(1, 'avatar.png', 'Lorem 11', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new PreviewChatDialog(1, 'avatar.png', 'Lorem 12', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new PreviewChatDialog(1, 'avatar.png', 'Lorem 13', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
    }
}