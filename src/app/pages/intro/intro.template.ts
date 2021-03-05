import { ComponentTemplate } from "../../shared/interfaces/component-template";

export class IntroPageTemplate implements ComponentTemplate {
  private tag: string;
  private cssClass: string;

  constructor() {
    this.tag = "ul";
    this.cssClass = "list";
  }

  public getTag(): string {
    return this.tag;
  }

  public getCssClass(): string {
    return this.cssClass;
  }

  public getContent(): string {
    return `
            {{#each this}}
                <li class="list__item">
                    <i class="{{icon}}"></i>
                    <span class="list__text" data-path='{{path}}'>{{text}}</span>
                </li>
            {{/each}}
        `;
  }
}
