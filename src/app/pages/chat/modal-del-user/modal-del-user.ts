import { BaseComponent } from "../../../core/base-component/base-component";
import { Templator } from "../../../core/core";
import { OnInit, PropsComponent } from "../../../shared/shared.interfaces";
import { ChatService } from "../../services/chat.service";
import { ChatUserListComponent } from "../chat-user-list/chat-user-list";
import { ModalDelUserTemplate } from "./modal-del-user.template";

export class ModalDelUserComponent extends BaseComponent implements OnInit {
  private chatService: ChatService;

  constructor(props: PropsComponent, templator: Templator) {
    super(props, templator, new ModalDelUserTemplate());
    this.chatService = ChatService.getInstance();
    this.onInit();
  }

  public onInit(): void {
    const userListComponent = new ChatUserListComponent(
      { root: [], md: this },
      this.templator
    );
    userListComponent
      .getEventEmitter()
      .on("user-list-selected", this.markUser.bind(this));
    this.setProps({ userList: userListComponent });
  }

  public prerenderChildrens(): void {
    if (this.getProps().userList) {
      this.renderToSelector(
        [this.getProps().userList],
        ".modal__section .modal__content_with_scroll"
      );
    }

    this.afterRenderChildrens();
  }

  public subscribe(): void {
    const closeMdAddUser = this.getElement().querySelector(
      ".modal__section .modal__close"
    );
    if (closeMdAddUser) {
      closeMdAddUser.addEventListener("click", () => {
        this.toggle();
      });
    }

    const btn = this.getElement().querySelector(
      ".modal__section .modal__button_bg_dark-green"
    );
    if (btn) {
      btn.addEventListener("click", () => {
        this.deleteUsers();
      });
    }
  }

  public toggle(): void {
    if (this.getElement().classList.contains("blackout_state_show")) {
      this.getProps().userList.setProps({ root: [] });
      this.getElement().classList.remove("blackout_state_show");
    } else {
      if (this.chatService.getSelectedDialog() !== null) {
        this.getProps().userList.setProps({
          root: this.chatService.getProfilesForDelete(),
        });
      }

      this.getElement().classList.add("blackout_state_show");
    }
  }

  public markUser(id: string): void {
    const users = this.getElement().querySelectorAll("[data-id]");
    for (const user of users) {
      const dataId = user.getAttribute("data-id");
      if (dataId !== null) {
        if (dataId === id) {
          if (user.classList.contains("list__item_selected")) {
            user.classList.remove("list__item_selected");
          } else {
            user.classList.add("list__item_selected");
          }

          break;
        }
      }
    }
  }

  public deleteUsers(): void {
    const users = this.getElement().querySelectorAll(".list__item_selected");
    const ids: number[] = [];
    for (const user of users) {
      const dataId = user.getAttribute("data-id");
      if (dataId !== null) {
        ids.push(parseInt(dataId, 10));
      }
    }

    if (ids.length > 0) {
      this.chatService.delUserFromDialog(ids);
    }

    this.toggle();
  }
}
