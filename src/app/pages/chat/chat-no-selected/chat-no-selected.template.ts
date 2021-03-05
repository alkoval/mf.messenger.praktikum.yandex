import { ComponentTemplate } from "../../../shared/interfaces/component-template";

export class ChatNoSelectedTemplate implements ComponentTemplate {
  private tag: string;
  private cssClass: string;

  constructor() {
    this.tag = "div";
    this.cssClass = "intro";
  }

  public getTag(): string {
    return this.tag;
  }

  public getCssClass(): string {
    return this.cssClass;
  }

  public getContent(): string {
    return `
            <span>Выберите чат чтобы отправить сообщение</span>
        `;
  }
}
