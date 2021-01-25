import { ChatDialog } from '../../shared/models/chat-dialog.js';
import { MockupData } from '../mockup/mockup-data.js';
import NavServise from './nav.service.js';
import { HistoryTextMessage } from '../../shared/models/history-text-message.js';
import { HistoryImgMessage } from '../../shared/models/history-img-message.js';

export default class BootstrapService {
    private navServise: NavServise;
    public mockupData: MockupData;

    constructor(navServise: NavServise) {
        this.navServise = navServise;
        this.mockupData = MockupData.getInstance();
        this.init();
    }

    private init(): void {
        this.prepaireMockupNavItems();
        this.prepaireMockupPreviewChatDialogs();
        this.prepaireMockupHistoryMessages();
    }

    private prepaireMockupNavItems(): void {
        this.mockupData.navItems = this.navServise.getNavItems();
    }

    private prepaireMockupPreviewChatDialogs(): void {
        this.mockupData.previewChatDialogs.push(new ChatDialog(1, 'avatar.png', 'Lorem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new ChatDialog(2, 'avatar.png', 'Lorem 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 6));
        this.mockupData.previewChatDialogs.push(new ChatDialog(3, 'avatar.png', 'Lorem 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new ChatDialog(4, 'avatar.png', 'Lorem 4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new ChatDialog(5, 'avatar.png', 'Lorem 5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new ChatDialog(6, 'avatar.png', 'Lorem 6', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 8));
        this.mockupData.previewChatDialogs.push(new ChatDialog(7, 'avatar.png', 'Lorem 7', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new ChatDialog(8, 'avatar.png', 'Lorem 8', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 2));
        this.mockupData.previewChatDialogs.push(new ChatDialog(9, 'avatar.png', 'Lorem 9', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new ChatDialog(10, 'avatar.png', 'Lorem 10', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new ChatDialog(11, 'avatar.png', 'Lorem 11', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new ChatDialog(12, 'avatar.png', 'Lorem 12', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
        this.mockupData.previewChatDialogs.push(new ChatDialog(13, 'avatar.png', 'Lorem 13', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', new Date(), 0));
    }

    private prepaireMockupHistoryMessages(): void {
        const shortMessage = 'Lorem ipsum';
        const middleMessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
        const largeMessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
        const img = 'assets/images/rnm.png';
        this.mockupData.historyMessages.push(new HistoryTextMessage(1, 'text', middleMessage, 1, false, new Date()));
        this.mockupData.historyMessages.push(new HistoryTextMessage(0, 'text', shortMessage, 0, false, new Date()));
        this.mockupData.historyMessages.push(new HistoryTextMessage(3, 'text', largeMessage, 1, false, new Date()));
        this.mockupData.historyMessages.push(new HistoryImgMessage(4, 'img', img, 1, false, new Date()));
        this.mockupData.historyMessages.push(new HistoryTextMessage(5, 'text', shortMessage, 1, false, new Date()));
        this.mockupData.historyMessages.push(new HistoryTextMessage(0, 'text', middleMessage, 0, false, new Date()));
        this.mockupData.historyMessages.push(new HistoryTextMessage(7, 'text', largeMessage, 1, false, new Date()));
        this.mockupData.historyMessages.push(new HistoryTextMessage(8, 'text', shortMessage, 1, false, new Date()));
        this.mockupData.historyMessages.push(new HistoryTextMessage(0, 'text', middleMessage, 0, false, new Date()));
        this.mockupData.historyMessages.push(new HistoryTextMessage(10, 'text', shortMessage, 1, false, new Date()));
        this.mockupData.historyMessages.push(new HistoryTextMessage(11, 'text', largeMessage, 1, false, new Date()));
        this.mockupData.historyMessages.push(new HistoryImgMessage(12, 'img', img, 1, false, new Date()));
        this.mockupData.historyMessages.push(new HistoryTextMessage(13, 'text', shortMessage, 1, false, new Date()));
    }
}