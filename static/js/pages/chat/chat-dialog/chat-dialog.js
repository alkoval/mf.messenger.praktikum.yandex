import { BaseComponent } from '../../../core/base-component/base-component.js';
import { ChatDialogTemplate } from './chat-dialog.template.js';
export class ChatDialogComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new ChatDialogTemplate());
    }
    prerenderChildrens() {
        this.renderChildrens();
    }
    setDataset() {
        let chatDialog = this.getProps().root;
        this.getElement().dataset['idDialog'] = chatDialog.id.toString();
    }
}
//# sourceMappingURL=chat-dialog.js.map