import { FormField } from "./form-field.js";

export class FormCard {
  public title: string;
  public btnText: string;
  public link: string;
  public linkText: string;
  public fields: FormField[];

  constructor(title: string, btnText: string, link: string, linkText: string) {
    this.title = title;
    this.btnText = btnText;
    this.link = link;
    this.linkText = linkText;
    this.fields = [];
  }
}
