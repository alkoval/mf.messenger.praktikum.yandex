import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { MockupData } from '../../../core/mockup/mockup-data.js';
import { PropsComponent } from '../../../shared/interfaces/props-component.js';
import { HistoryImgMessageComponent } from '../history-img-message/history-img-message.js';
import { HistoryTextMessageComponent } from '../history-text-message/history-text-message.js';
import { ChatHistoryTemplate } from './chat-history.template.js';

export class ChatHistoryComponent extends BaseComponent {

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ChatHistoryTemplate());
    }

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }

    public prerenderChildrens(): void {
        this.childrens = [];
        const length = Math.floor(Math.random() * Math.floor(MockupData.getInstance().historyMessages.length - 1));
        const data = MockupData.getInstance().historyMessages.slice(0, length);
        for (let item of data) {
            if (item.type === 'text') {
                this.childrens.push(new HistoryTextMessageComponent(item, this.templator));
            }
            if (item.type === 'img') {
                this.childrens.push(new HistoryImgMessageComponent(item, this.templator));
            }
        }
        // Заменить текущее использование модальных окон на компонентный подход
        this.renderChildrensToSelector('.history__board');
    }

    public subscribe(): void {
        const md = this.getElement().querySelectorAll('.history__button')[0];
        md.addEventListener('click', () => { this.toggleModalDialog() });

        const md2 = this.getElement().querySelectorAll('.history__button')[1];
        md2.addEventListener('click', () => { this.toggleModalClip() });
    }

    public toggleModalDialog(): void {
        const md = document.getElementsByClassName('modal modal_position-right-top')[0];
        if (md.classList.contains("modal_state_show")) {
            md.classList.remove("modal_state_show");
        } else {
            md.classList.add("modal_state_show");
        }
    }

    public toggleModalClip(): void {
        const md = document.getElementsByClassName('modal modal_position_left-end')[0] as HTMLElement;
        const btn = document.getElementsByClassName('history__button history__button_type_text')[0] as HTMLElement;
        md.style.top = btn.offsetTop.toString();
        md.style.left = btn.offsetLeft.toString();
        if (md.classList.contains("modal_state_show")) {
            md.classList.remove("modal_state_show");
        } else {
            md.classList.add("modal_state_show");
        }
    }

    // Переписать метод на использование сервиса истории диалога
    public drawHistory(): void {

    }
}