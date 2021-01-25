import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { PropsComponent } from '../../interfaces/props-component.js';
import { ProfileGroupTextTemplate } from './profile-group-text.template.js';

export class ProfileGroupTextComponent extends BaseComponent {

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ProfileGroupTextTemplate());
    }

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}