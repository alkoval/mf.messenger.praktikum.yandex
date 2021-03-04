import { BaseComponent } from "../../../core/base-component/base-component";
import { Templator } from "../../../core/core";
import { PropsComponent } from "../../../shared/shared.interfaces";
import { ChatNoSelectedTemplate } from "./chat-no-selected.template";

export class ChatNoSelectedComponent extends BaseComponent {
  constructor(props: PropsComponent, templator: Templator) {
    super(props, templator, new ChatNoSelectedTemplate());
  }
}
