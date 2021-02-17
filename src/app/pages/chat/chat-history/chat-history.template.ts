import { ComponentTemplate } from '../../../shared/interfaces/component-template'

export class ChatHistoryTemplate implements ComponentTemplate {
    private tag: string;
    private cssClass: string;

    constructor() {
        this.tag = 'div';
        this.cssClass = 'history';
    }

    public getTag(): string {
        return this.tag;
    }

    public getCssClass(): string {
        return this.cssClass;
    }

    public getContent(): string {
        return `
            {{#if title}}
                <div class="history__header">
                    <div class="history__avatar-column">
                        <img class="history__avatar" src="{{avatar}}">
                    </div>
                    <div class="history__text-column">
                        <span class="history__dialog-name">{{title}}</span>
                    </div>
                    <div class="history__button-column">
                        <button class="history__button history__button_type_round">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                </div>
                <div class="history__body">
                    <div class="history__board"></div>
                    <div class="modal modal_position-right-top" id="mdDialog">
                        <div class="list">
                            <div class="list__item">
                                <div class="list__icon"><i class="far fa-plus-square"></i></div>
                                <div class="list__text">Добавить пользователя</div>
                            </div>
                            <div class="list__item">
                                <div class="list__icon"><i class="far fa-minus-square"></i></div>
                                <div class="list__text">Удалить пользователя</div>
                            </div>
                            <div class="list__item">
                                <div class="list__icon"><i class="fas fa-trash-alt"></i></div>
                                <div class="list__text">Удалить диалог</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal modal_position_left-end" id="mdClip">
                        <div class="list">
                            <div class="list__item">
                                <div class="list__icon"><i class="far fa-image"></i></div>
                                <div class="list__text">Фото и Видео</div>
                            </div>
                            <div class="list__item">
                                <div class="list__icon"><i class="far fa-sticky-note"></i></div>
                                <div class="list__text">Файл</div>
                            </div>
                            <div class="list__item">
                                <div class="list__icon"><i class="far fa-dot-circle"></i></div>
                                <div class="list__text">Локация</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="history__footer">
                    <div class="history__button-column">
                        <button class="history__button history__button_type_text" id="btnClip">
                            <i class="fas fa-paperclip"></i>
                        </button>
                    </div>
                    <div class="history__input-column">
                        <div class="single-field">
                            <input class="single-field__input fas" type="text" id="message" placeholder="Сообщение"
                                required>
                        </div>
                    </div>
                    <div class="history__button-column">
                        <button class="history__button history__button_type_round history__button_bg_dark-green">
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            {{else}}
                <div class="intro">
                    <span>Выберите чат чтобы отправить сообщение</span>
                </div>
            {{/if}}
        `;
    }
}