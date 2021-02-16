export class ModalDelUserTemplate {
    constructor() {
        this.tag = 'div';
        this.cssClass = 'blackout';
    }
    getTag() {
        return this.tag;
    }
    getCssClass() {
        return this.cssClass;
    }
    getContent() {
        return `
            <div class="modal modal_state_show">
                <form class="modal__content">
                    <div class="modal__section">
                        <span class="modal__title">Удалить пользователя</span>
                        <span class="modal__close"><i class="fas fa-times"></i></close>
                    </div>
                    <div class="modal__section">
                        <div class="modal__content modal__content_with_scroll w-100"></div>                           
                    </div>
                    <div class="modal__section">
                        <button class="modal__button modal__button_bg_dark-green" type="button">Удалить</button>
                    </div>
                </form>
            </div>
        `;
    }
}
//# sourceMappingURL=modal-del-user.template.js.map