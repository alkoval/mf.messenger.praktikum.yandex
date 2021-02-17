import { BaseComponent } from '../../../core/base-component/base-component'
import { Templator } from '../../../core/core'
import { Router } from '../../../core/router/router'
import { PropsComponent } from '../../interfaces/props-component'
import { TextLink } from '../../models/text-link'
import { TextLinkTemplate } from './text-link.template'

export class TextLinkComponent extends BaseComponent {
    private router: Router;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new TextLinkTemplate());
        this.router = Router.getInstance();
    }

    public subscribe(): void {
        const link = this.getProps().root as TextLink;
        const elem = this.getElement() as HTMLElement;
        elem.addEventListener('click', () => { this.router.go(link.path) });
    }
}