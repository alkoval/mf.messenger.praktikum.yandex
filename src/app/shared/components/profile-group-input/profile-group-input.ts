import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { PropsComponent } from '../../interfaces/props-component.js';
import { ProfileGroupInputTemplate } from './profile-group-input.template.js';

export class FormFieldComponent extends BaseComponent {

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ProfileGroupInputTemplate());
    }

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}