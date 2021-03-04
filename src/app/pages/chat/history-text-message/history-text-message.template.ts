import { ComponentTemplate } from "../../../shared/interfaces/component-template";

export class HistoryTextMessageTemplate implements ComponentTemplate {
  private tag: string;
  private cssClass: string;

  constructor() {
    this.tag = "div";
    this.cssClass = "history__message history__message_type_text";
  }

  public getTag(): string {
    return this.tag;
  }

  public getCssClass(): string {
    return this.cssClass;
  }

  public getContent(): string {
    return `
                <div>
                    {{#if isLeft}}<span class="history__user-name">{{userName}}</span>{{/if}}
                    <p>{{message}}</p>
                </div>
                <div class="history__time">
                    <time>{{shortTime}}</time>
                </div>
        `;
  }
}
