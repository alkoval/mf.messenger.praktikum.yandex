import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { Notify } from '../../interfaces/notify.js';
import { PropsComponent } from '../../interfaces/props-component.js';
import { NotifyTemplate } from './notify.template.js';

export class NotifyComponent extends BaseComponent {

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new NotifyTemplate());
    }

    public subscribe(): void {
        const notify: Notify = this.getProps().root as Notify;
        setTimeout(this.hide.bind(this), notify.time);
    }

    public show(): void {
        this.getElement().style.display = 'block';
    }

    public hide(): void {
        this.getElement().remove();//.style.display = 'none';
    }
}