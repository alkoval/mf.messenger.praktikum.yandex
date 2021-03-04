import { BaseComponent } from "../../../core/base-component/base-component";
import { Templator } from "../../../core/core";
import { FormFieldComponent } from "../../../shared/components/form-field/form-field";
import { OnInit, PropsComponent } from "../../../shared/shared.interfaces";
import { ChatService } from "../../services/chat.service";
import { ProfileService } from "../../services/profile.service";
import { ChatUserListComponent } from "../chat-user-list/chat-user-list";
import { ModalAddUserTemplate } from "./modal-add-user.template";

export class ModalAddUserComponent extends BaseComponent implements OnInit {
  private profileService: ProfileService;
  private chatService: ChatService;

  constructor(props: PropsComponent, templator: Templator) {
    super(props, templator, new ModalAddUserTemplate());
    this.profileService = ProfileService.getInstance();
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
      .on("user-list-selected", this.addUser.bind(this));
    this.setProps({ userList: userListComponent });
  }

  public prerenderChildrens(): void {
    if (this.childrens.length === 0 && this.getProps().field) {
      const fieldComponent = new FormFieldComponent(
        { root: this.getProps().field },
        this.templator
      );
      const field = fieldComponent
        .getElement()
        .querySelector(".form-field__input");
      if (field) {
        field.addEventListener("keyup", (e) => {
          this.searchUser(e.target as HTMLInputElement);
        });
      }

      this.renderToSelector(
        [fieldComponent],
        ".modal__section .modal__content-field"
      );
    }

    if (this.getProps().userList) {
      this.renderToSelector(
        [this.getProps().userList],
        ".modal__section .modal__content_with_scroll"
      );
    }

    this.afterRenderChildrens();
  }

  public subscribe(): void {
    const closeMdAddUser = this.getElement().querySelectorAll(
      ".modal__section .modal__close"
    )[0];
    if (closeMdAddUser) {
      closeMdAddUser.addEventListener("click", () => {
        this.toggle();
      });
    }
  }

  public toggle(): void {
    if (this.getElement().classList.contains("blackout_state_show")) {
      this.getElement().classList.remove("blackout_state_show");
    } else {
      this.getElement().classList.add("blackout_state_show");
    }
  }

  public addUser(id: number): void {
    this.toggle();
    this.chatService.addUserToDialog(id);
  }

  public searchUser(input: HTMLInputElement): void {
    if (input.value.length > 0) {
      this.profileService.search(input.value).then((response) => {
        this.getProps().userList.setProps({ root: response });
      });
    } else {
      this.getProps().userList.setProps({ root: [] });
    }
  }
}
