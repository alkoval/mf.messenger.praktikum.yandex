import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { PropsComponent } from '../../../shared/interfaces/props-component.js';
import { HistoryTextMessage } from '../../../shared/models/history-text-message.js';
import { HistoryTextMessageTemplate } from './history-text-message.template.js';

export class HistoryTextMessageComponent extends BaseComponent {

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new HistoryTextMessageTemplate());
    }

    public render(): string {
        if ((this.getProps() as HistoryTextMessage).from !== 0) {
            this.getElement().classList.add('history__message_position_left');
        } else {
            this.getElement().classList.add('history__message_position_right');
            this.getElement().classList.add('history__message_bg_dark-green');
        }
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}