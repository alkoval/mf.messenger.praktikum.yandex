import { ComponentTemplate } from "../../interfaces/component-template";

export class FormFieldTemplate implements ComponentTemplate {
  private tag: string;
  private cssClass: string;

  constructor() {
    this.tag = "div";
    this.cssClass = "form-field";
  }

  public getTag(): string {
    return this.tag;
  }

  public getCssClass(): string {
    return this.cssClass;
  }

  public getContent(): string {
    return `
            <input class="form-field__input" type="{{type}}" name="{{name}}" required>
            <label class="form-field__label" for="{{name}}"> {{label}} </label>
            <span class="form-field__error">{{error}}</span>
        `;
  }
}
