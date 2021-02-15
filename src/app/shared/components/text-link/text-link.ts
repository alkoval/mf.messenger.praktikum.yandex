import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { Router } from '../../../core/router/router.js';
import { PropsComponent } from '../../interfaces/props-component.js';
import { TextLink } from '../../models/text-link.js';
import { TextLinkTemplate } from './text-link.template.js';

export class TextLinkComponent extends BaseComponent {
    private router: Router;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new TextLinkTemplate());
        this.router = Router.getInstance();
    }

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps().root);
    }

    public subscribe(): void {
        const link = this.getProps().root as TextLink;
        const elem = this.getElement() as HTMLElement;
        elem.addEventListener('click', () => { this.router.go(link.path) });
    }
}