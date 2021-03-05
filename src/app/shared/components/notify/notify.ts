import { BaseComponent } from "../../../core/base-component/base-component";
import { Templator } from "../../../core/core";
import { Notify } from "../../interfaces/notify";
import { PropsComponent } from "../../interfaces/props-component";
import { NotifyTemplate } from "./notify.template";

export class NotifyComponent extends BaseComponent {
  constructor(props: PropsComponent, templator: Templator) {
    super(props, templator, new NotifyTemplate());
  }

  public subscribe(): void {
    const notify: Notify = this.getProps().root as Notify;
    setTimeout(this.hide.bind(this), notify.time);
  }

  public show(): void {
    this.getElement().style.display = "block";
  }

  public hide(): void {
    this.getElement().remove(); // .style.display = 'none';
  }
}
