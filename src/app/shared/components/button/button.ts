import { BaseComponent } from "../../../core/base-component/base-component";
import Templator from "../../../core/services/templator.service";
import { PropsComponent } from "../../interfaces/props-component";
import { Button } from "../../models/button";
import { ButtonTemplate } from "./button.template";

export class ButtonComponent extends BaseComponent {
  constructor(props: PropsComponent, templator: Templator) {
    super(props, templator, new ButtonTemplate());
  }

  public render(): string {
    const btn = this.getProps().root as Button;
    this.getElement().classList.add(btn.cssClass);
    return this.templator.compile(
      this.template.getContent(),
      this.getProps().root
    );
  }
}
