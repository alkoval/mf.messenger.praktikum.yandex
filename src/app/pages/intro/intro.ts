import { BaseComponent } from '../../core/base-component/base-component.js';
import { Templator } from '../../core/core.js';
import { PropsComponent } from '../../shared/interfaces/props-component.js';
import { IntroPageTemplate } from './intro.template.js';

export class IntroPageComponent extends BaseComponent {

    constructor(props: PropsComponent, templator: Templator) {
        super("div", props, templator, new IntroPageTemplate().content);
    }

    public render(): string {
        return this.templator.compile(this.template, this.getProps());
    }

    public onClick(): void {
        console.log('click!')
    }
}