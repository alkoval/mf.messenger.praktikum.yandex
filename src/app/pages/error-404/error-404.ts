import { BaseComponent } from '../../core/base-component/base-component'
import { Templator } from '../../core/core'
import { PropsComponent } from '../../shared/interfaces/props-component'
import { Error404PageTemplate } from './error-404.template'

export class Error404PageComponent extends BaseComponent {

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new Error404PageTemplate());
    }

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}