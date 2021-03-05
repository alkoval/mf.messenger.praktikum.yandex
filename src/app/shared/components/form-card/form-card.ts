import { BaseComponent } from "../../../core/base-component/base-component";
import { Templator } from "../../../core/core";
import { PropsComponent } from "../../interfaces/props-component";
import { FormCardTemplate } from "./form-card.template";
import { FormFieldComponent } from "../form-field/form-field";
import { FormCard } from "../../models/form-card";
import { ButtonComponent } from "../button/button";
import { Button, BUTTON_STYLE } from "../../models/button";
import { TextLink } from "../../models/text-link";
import { TextLinkComponent } from "../text-link/text-link";

export class FormCardComponent extends BaseComponent {
  constructor(props: PropsComponent, templator: Templator) {
    super(props, templator, new FormCardTemplate());
  }

  public prerenderChildrens(): void {
    const form = this.getProps().root as FormCard;
    for (const item of form.fields) {
      this.childrens.push(
        new FormFieldComponent({ root: item }, this.templator)
      );
    }

    this.renderChildrensToSelector(".card__body");

    const btn = new ButtonComponent(
      { root: new Button(form.btnText, BUTTON_STYLE.BG_DARK_GREEN, "button") },
      this.templator
    );
    this.childrens.push(btn);
    const link = new TextLinkComponent(
      { root: new TextLink(form.linkText, "", form.link) },
      this.templator
    );
    this.childrens.push(link);
    this.renderToSelector([btn, link], ".card__footer");
  }
}
