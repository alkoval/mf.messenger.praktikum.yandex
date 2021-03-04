import { ComponentTemplate } from "../../shared/interfaces/component-template";

export class Error404PageTemplate implements ComponentTemplate {
  private tag: string;
  private cssClass: string;

  constructor() {
    this.tag = "ul";
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
            <span>Андрюха, у нас 404! Возможно криминал! По коням!</span>
        `;
  }
}
