import { BaseComponent } from '../../../core/base-component/base-component.js';
import { HistoryImgMessageTemplate } from './history-img-message.template.js';
export class HistoryImgMessageComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new HistoryImgMessageTemplate());
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}
//# sourceMappingURL=history-img-message.js.map