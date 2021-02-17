import { ComponentTemplate } from '../../../shared/interfaces/component-template'

export class ModalNewDialogTemplate implements ComponentTemplate {
    private tag: string;
    private cssClass: string;

    constructor() {
        this.tag = 'div';
        this.cssClass = 'blackout';
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
                        <span class="modal__title">Новый диалог</span>
                        <span class="modal__close"><i class="fas fa-times"></i></close>
                    </div>
                    <div class="modal__section">
                        <div class="modal__content"></div>                           
                    </div>
                    <div class="modal__section">
                        <button class="modal__button modal__button_bg_dark-green" type="button">Добавить</button>
                    </div>
                </form>
            </div>
        `;
    }
}