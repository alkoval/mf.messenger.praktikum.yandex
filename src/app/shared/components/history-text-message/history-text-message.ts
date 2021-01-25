import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { PropsComponent } from '../../interfaces/props-component.js';
import { HistoryTextMessage } from '../../models/history-text-message.js';
import { HistoryTextMessageTemplate } from './history-text-message.template.js';

export class HistoryTextMessageComponent extends BaseComponent {

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new HistoryTextMessageTemplate());
    }

    public render(): string {
        if ((this.getProps() as HistoryTextMessage).from !== 0) {
            
        }
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}