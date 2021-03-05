import { BaseComponent } from "../../../core/base-component/base-component";
import { Templator } from "../../../core/core";
import { PropsComponent } from "../../../shared/interfaces/props-component";
import { ChatDialog } from "../../../shared/models/chat-dialog";
import { ChatService } from "../../services/chat.service";
import { ChatDialogTemplate } from "./chat-dialog.template";

export class ChatDialogComponent extends BaseComponent {
  private chatService: ChatService;

  constructor(props: PropsComponent, templator: Templator) {
    super(props, templator, new ChatDialogTemplate());
    this.chatService = ChatService.getInstance();
  }

  public subscribe(): void {
    this.getElement().addEventListener("click", () => {
      this.selected(this.getProps().root.id);
    });
  }

  public setDataset(): void {
    const chatDialog = this.getProps().root as ChatDialog;
    this.getElement().dataset.idDialog = chatDialog.id.toString();
  }

  public selected(id: number): void {
    this.chatService.selectDialogById(id);
  }
}
