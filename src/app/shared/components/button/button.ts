import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { PropsComponent } from '../../interfaces/props-component.js';
import { Button } from '../../models/button.js';
import { ButtonTemplate } from './button.template.js';

export class ButtonComponent extends BaseComponent {

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ButtonTemplate());
    }

    public render(): string {
        const btn = this.getProps().root as Button;
        this.getElement().classList.add(btn.cssClass);
        return this.templator.compile(this.template.getContent(), this.getProps().root);
    }
}