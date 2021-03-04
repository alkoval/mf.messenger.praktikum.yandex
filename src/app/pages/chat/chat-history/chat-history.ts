import { BaseComponent } from "../../../core/base-component/base-component";
import { Templator } from "../../../core/core";
import { OnInit, PropsComponent } from "../../../shared/shared.interfaces";
import { ChatDialog, HistoryTextMessage } from "../../../shared/shared.models";
import { ChatService, CHAT_EVENTS } from "../../services/chat.service";
import { MessageService, MESSAGE_EVENTS } from "../../services/message.service";
import { ProfileService } from "../../services/profile.service";
import { HistoryTextMessageComponent } from "../history-text-message/history-text-message";
import { ChatHistoryTemplate } from "./chat-history.template";

export class ChatHistoryComponent extends BaseComponent implements OnInit {
  private profileService: ProfileService;
  private chatService: ChatService;
  private messageService: MessageService;
  private message: HTMLInputElement | null;

  constructor(props: PropsComponent, templator: Templator) {
    super(props, templator, new ChatHistoryTemplate());
    this.chatService = ChatService.getInstance();
    this.messageService = MessageService.getInstance();
    this.profileService = ProfileService.getInstance();
    this.message = null;
    this.onInit();
  }

  public onInit(): void {
    this.chatService
      .subscribe()
      .on(CHAT_EVENTS.DIALOG_SELECTED, this.selected.bind(this));
    this.messageService
      .subscribe()
      .on(MESSAGE_EVENTS.NEW_MESSAGE, this.drawMessage.bind(this));
    this.messageService
      .subscribe()
      .on(MESSAGE_EVENTS.ARCHIVE_MESSAGE, this.drawHistory.bind(this));
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

    const mdAddUser = this.getElement().querySelectorAll(
      ".modal_position-right-top .list__item"
    )[0];
    if (mdAddUser) {
      mdAddUser.addEventListener("click", () => {
        this.showMdAddUser();
      });
    }

    const mdDelUser = this.getElement().querySelectorAll(
      ".modal_position-right-top .list__item"
    )[1];
    if (mdDelUser) {
      mdDelUser.addEventListener("click", () => {
        this.showMdDelUser();
      });
    }

    const delSelected = this.getElement().querySelectorAll(
      ".modal_position-right-top .list__item"
    )[2];
    if (delSelected) {
      delSelected.addEventListener("click", () => {
        this.deleteSelected();
      });
    }

    const btnSend = this.getElement().querySelectorAll(
      ".history__button-column .history__button"
    )[2];
    if (btnSend) {
      btnSend.addEventListener("click", () => {
        this.sendMessage();
      });
    }

    this.message = this.getElement().querySelector(
      ".history__input-column .single-field__input"
    ) as HTMLInputElement;
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

  public selected(dialog: ChatDialog | null): void {
    this.setProps({ root: dialog });
    this.messageService.connect(true);
  }

  public showMdAddUser(): void {
    this.toggleModalDialog();
    this.getProps().mdAddUser.toggle();
  }

  public showMdDelUser(): void {
    this.toggleModalDialog();
    this.getProps().mdDelUser.toggle();
  }

  public drawHistory(data: HistoryTextMessage[]): void {
    for (const item of data) {
      if (this.profileService.getProfile()!.id === item.from) {
        item.isLeft = false;
      }

      const component = new HistoryTextMessageComponent(
        { root: item },
        this.templator
      );
      this.renderToSelectorTop([component], ".history__board");
    }
  }

  public drawMessage(data: HistoryTextMessage): void {
    if (this.profileService.getProfile()!.id === data.from) {
      data.isLeft = false;
    }

    const component = new HistoryTextMessageComponent(
      { root: data },
      this.templator
    );
    this.renderToSelector([component], ".history__board");
    component.getElement().scrollIntoView();
  }

  public deleteSelected(): void {
    this.toggleModalDialog();
    const dialog = this.chatService.getSelectedDialog();
    if (dialog !== null) {
      this.chatService.deleteDialog(dialog.id);
    }
  }

  public sendMessage(): void {
    if (this.message) {
      if (this.message.value.length > 0) {
        this.messageService.send(this.message.value);
        this.message.value = "";
      }
    }
  }
}
