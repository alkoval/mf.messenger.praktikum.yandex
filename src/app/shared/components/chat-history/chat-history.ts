import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { PropsComponent } from '../../interfaces/props-component.js';
import { ChatHistoryTemplate } from './chat-history.template.js';

export class ChatHistoryComponent extends BaseComponent {

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ChatHistoryTemplate());
    }

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }

    public prerenderChildrens(): void {
        this.renderChildrens();
    }

    public subscribe(): void { }
}