import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { PropsComponent } from '../../interfaces/props-component.js';
import { ModalTemplate } from './modal.template.js';

export class ModalComponent extends BaseComponent {
    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ModalTemplate());
    }

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}