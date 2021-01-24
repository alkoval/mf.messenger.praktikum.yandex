import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { PropsComponent } from '../../interfaces/props-component.js';
import { FormCardTemplate } from './form-card.template.js';
import { FormFieldComponent } from '../form-field/form-field.js';
import { FormCard } from '../../models/form-card.js';

export class FormCardComponent extends BaseComponent {

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new FormCardTemplate());
    }

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }

    public prerenderChildrens(): void {
        for (let item of (this.getProps() as FormCard).fields) {
            this.childrens.push(new FormFieldComponent(item, this.templator));
        }
        this.renderChildrensToSelector('.card__body');
    }
}