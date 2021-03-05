import { ComponentTemplate } from "../../shared/interfaces/component-template";

export class ChangePasswordPageTemplate implements ComponentTemplate {
  private tag: string;
  private cssClass: string;

  constructor() {
    this.tag = "div";
    this.cssClass = "profile";
  }

  public getTag(): string {
    return this.tag;
  }

  public getCssClass(): string {
    return this.cssClass;
  }

  public getContent(): string {
    return `
            <div class="profile__sidebar">
                <span class="profile__back"><i class="fas fa-arrow-left"></i></span>
            </div>
            <div class="profile__content">
                <div class="profile__card">
                    <ul class="profile__section profile__body"></ul>
                    <div class="profile__section profile__footer"></div>
                </div>
            </div>
        `;
  }
}
