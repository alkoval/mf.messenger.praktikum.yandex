import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { PropsComponent } from '../../../shared/interfaces/props-component.js';
import { ChatDialog } from '../../../shared/models/chat-dialog.js';
import { ChatDialogTemplate } from './chat-dialog.template.js';

export class ChatDialogComponent extends BaseComponent {
    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ChatDialogTemplate());
    }

    public prerenderChildrens(): void {
        this.renderChildrens();
    }

    public setDataset(): void {
        let chatDialog = this.getProps().root as ChatDialog;
        this.getElement().dataset['idDialog'] = chatDialog.id.toString();
    }
}