import { BaseComponent } from "../../../core/base-component/base-component";
import { Templator } from "../../../core/core";
import { MockupData } from "../../../core/mockup/mockup-data";
import { PropsComponent } from "../../../shared/shared.interfaces";
import { ChatService } from "../../services/chat.service";
import { ChatHistoryTemplate } from "../chat-history/chat-history.template";
import { HistoryImgMessageComponent } from "../history-img-message/history-img-message";
import { HistoryTextMessageComponent } from "../history-text-message/history-text-message";

export class ChatHistoryComponent extends BaseComponent {
  private chatService: ChatService;

  constructor(props: PropsComponent, templator: Templator) {
    super(props, templator, new ChatHistoryTemplate());
    this.chatService = ChatService.getInstance();
  }

  public prerenderChildrens(): void {
    this.childrens = [];
    const length = Math.floor(
      Math.random() *
        Math.floor(MockupData.getInstance().historyMessages.length - 1)
    );
    const data = MockupData.getInstance().historyMessages.slice(0, length);
    for (const item of data) {
      if (item.type === "text") {
        this.childrens.push(
          new HistoryTextMessageComponent({ root: item }, this.templator)
        );
      }

      if (item.type === "img") {
        this.childrens.push(
          new HistoryImgMessageComponent({ root: item }, this.templator)
        );
      }
    }

    // Заменить текущее использование модальных окон на компонентный подход
    this.renderChildrensToSelector(".history__board");
  }

  public subscribe(): void {
    const md = this.getElement().querySelectorAll(".history__button")[0];
    if (md) {
      md.addEventListener("click", () => {
        this.toggleModalDialog();
      });
    }

    const md2 = this.getElement().querySelectorAll(".history__button")[1];
    if (md2) {
      md2.addEventListener("click", () => {
        this.toggleModalClip();
      });
    }

    const delDialogLink = this.getElement().querySelectorAll(
      ".modal_position-right-top .list__item"
    )[2];
    if (delDialogLink) {
      delDialogLink.addEventListener("click", () => {
        this.deleteDialog();
      });
    }
  }

  public toggleModalDialog(): void {
    const md = this.getElement().getElementsByClassName(
      "modal modal_position-right-top"
    )[0];
    if (md.classList.contains("modal_state_show")) {
      md.classList.remove("modal_state_show");
    } else {
      md.classList.add("modal_state_show");
    }
  }

  public toggleModalClip(): void {
    const md = this.getElement().getElementsByClassName(
      "modal modal_position_left-end"
    )[0] as HTMLElement;
    const btn = this.getElement().getElementsByClassName(
      "history__button history__button_type_text"
    )[0] as HTMLElement;
    md.style.top = btn.offsetTop.toString();
    md.style.left = btn.offsetLeft.toString();
    if (md.classList.contains("modal_state_show")) {
      md.classList.remove("modal_state_show");
    } else {
      md.classList.add("modal_state_show");
    }
  }

  public deleteDialog(): void {
    this.toggleModalDialog();
    const dialog = this.chatService.getSelectedDialog();
    console.log(dialog);
    if (dialog !== null) {
      this.chatService.deleteDialog(dialog.id);
    }
  }
}
