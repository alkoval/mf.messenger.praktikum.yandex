import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { PropsComponent } from '../../../shared/shared.interfaces.js';
import { ChatNoSelectedTemplate } from './chat-no-selected.template.js';

export class ChatNoSelectedComponent extends BaseComponent {
    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ChatNoSelectedTemplate());
    }
}