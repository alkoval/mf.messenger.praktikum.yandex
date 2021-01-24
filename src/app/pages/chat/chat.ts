import { BaseComponent } from '../../core/base-component/base-component.js';
import { Templator } from '../../core/core.js';
import { PropsComponent } from '../../shared/interfaces/props-component.js';
import { ChatPageTemplate } from './chat.template.js';
import FormValidationService from '../../core/services/form-validation.service.js';
import { PreviewChatDialog } from '../../shared/models/preview-chat-dialog.js';
import { ChatDialogComponent } from '../../shared/components/chat-dialog/chat-dialog.js';

export class ChatPageComponent extends BaseComponent {
    //@ts-ignore
    private formValidationService: FormValidationService;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ChatPageTemplate());
        this.formValidationService = new FormValidationService();
    }

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }

    public prerenderChildrens(): void {
        for (let item of this.getProps() as PreviewChatDialog[]) {
            this.childrens.push(new ChatDialogComponent(item, this.templator));
        }

        this.renderChildrensToSelector('.chat__dialogs');
    }

    public subscribe(): void {      
        const nodes = this.getElement().querySelectorAll('.chat__dialog');
        for (let node of nodes) {
            node.addEventListener('click', () => { this.getHistory() });
        }
    }

    public getHistory() {
        console.log(this)
    }
}