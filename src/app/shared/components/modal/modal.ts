import { BaseComponent } from '../../../core/base-component/base-component'
import { Templator } from '../../../core/core'
import { PropsComponent } from '../../interfaces/props-component'
import { ModalTemplate } from './modal.template'

export class ModalComponent extends BaseComponent {
    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ModalTemplate());
    }
}