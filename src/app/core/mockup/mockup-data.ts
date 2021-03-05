import { PropsComponent } from "../../shared/interfaces/props-component";
import { NavItem } from "../../shared/interfaces/nav-item";
import { ChatDialog } from "../../shared/models/chat-dialog";
import { HistoryMessage } from "../../shared/interfaces/history-message";
import { Profile } from "../../shared/models/profile";

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
