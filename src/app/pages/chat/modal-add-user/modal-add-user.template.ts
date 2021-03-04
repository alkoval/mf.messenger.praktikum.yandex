import { ComponentTemplate } from "../../../shared/interfaces/component-template";

export class ModalAddUserTemplate implements ComponentTemplate {
  private tag: string;
  private cssClass: string;

  constructor() {
    this.tag = "div";
    this.cssClass = "blackout";
  }

  public getTag(): string {
    return this.tag;
  }

  public getCssClass(): string {
    return this.cssClass;
  }

  public getContent(): string {
    return `
            <div class="modal modal_state_show">
                <form class="modal__content">
                    <div class="modal__section">
                        <span class="modal__title">Добавить пользователя</span>
                        <span class="modal__close"><i class="fas fa-times"></i></close>
                    </div>
                    <div class="modal__section modal__section_column">
                        <div class="modal__content modal__content-field"></div>  
                        <div 
                        class="modal__content modal__content_with_scroll w-100"></div>
                    </div>
                </form>
            </div>
        `;
  }
}
