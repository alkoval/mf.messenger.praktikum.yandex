import { BaseComponent } from "../../../core/base-component/base-component";
import { Templator } from "../../../core/core";
import { PropsComponent } from "../../../shared/interfaces/props-component";
import { HistoryTextMessage } from "../../../shared/models/history-text-message";
import { HistoryTextMessageTemplate } from "./history-text-message.template";

export class HistoryTextMessageComponent extends BaseComponent {
  constructor(props: PropsComponent, templator: Templator) {
    super(props, templator, new HistoryTextMessageTemplate());
  }

  public render(): string {
    if ((this.getProps().root as HistoryTextMessage).isLeft) {
      this.getElement().classList.add("history__message_position_left");
    } else {
      this.getElement().classList.add("history__message_position_right");
      this.getElement().classList.add("history__message_bg_dark-green");
    }

    return this.templator.compile(
      this.template.getContent(),
      this.getProps().root
    );
  }
}
