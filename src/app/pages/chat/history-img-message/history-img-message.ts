import { BaseComponent } from "../../../core/base-component/base-component";
import { Templator } from "../../../core/core";
import { PropsComponent } from "../../../shared/interfaces/props-component";
import { HistoryImgMessageTemplate } from "./history-img-message.template";

export class HistoryImgMessageComponent extends BaseComponent {
  constructor(props: PropsComponent, templator: Templator) {
    super(props, templator, new HistoryImgMessageTemplate());
  }
}
