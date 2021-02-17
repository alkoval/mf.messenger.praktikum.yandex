import { BaseComponent } from '../../../core/base-component/base-component'
import { Templator } from '../../../core/core'
import { PropsComponent } from '../../interfaces/props-component'
import { ProfileGroupTextTemplate } from './profile-group-text.template'

export class ProfileGroupTextComponent extends BaseComponent {

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ProfileGroupTextTemplate());
    }
}