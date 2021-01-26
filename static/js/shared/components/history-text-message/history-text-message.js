import { BaseComponent } from '../../../core/base-component/base-component.js';
import { HistoryTextMessageTemplate } from './history-text-message.template.js';
export class HistoryTextMessageComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new HistoryTextMessageTemplate());
    }
    render() {
        if (this.getProps().from !== 0) {
            this.getElement().classList.add('history__message_position_left');
        }
        else {
            this.getElement().classList.add('history__message_position_right');
            this.getElement().classList.add('history__message_bg_dark-green');
        }
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}
//# sourceMappingURL=history-text-message.js.map