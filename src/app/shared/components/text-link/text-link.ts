import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { PropsComponent } from '../../interfaces/props-component.js';
import { TextLink } from '../../models/text-link.js';
import { TextLinkTemplate } from './text-link.template.js';

export class TextLinkComponent extends BaseComponent {

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new TextLinkTemplate());
    }

    public render(): string {
        const link = this.getProps() as TextLink;
        const elem = this.getElement() as HTMLLinkElement;
        elem.href = link.url;
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}