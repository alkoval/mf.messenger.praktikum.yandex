import { BaseComponent } from '../../../core/base-component/base-component.js';
import { FormCardTemplate } from './form-card.template.js';
import { FormFieldComponent } from '../form-field/form-field.js';
import { ButtonComponent } from '../button/button.js';
import { Button, BUTTON_STYLE } from '../../models/button.js';
import { TextLink } from '../../models/text-link.js';
import { TextLinkComponent } from '../text-link/text-link.js';
export class FormCardComponent extends BaseComponent {
    constructor(props, templator) {
        super(props, templator, new FormCardTemplate());
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
    prerenderChildrens() {
        const form = this.getProps();
        for (let item of form.fields) {
            this.childrens.push(new FormFieldComponent(item, this.templator));
        }
        this.renderChildrensToSelector('.card__body');
        const btn = new ButtonComponent(new Button(form.btnText, BUTTON_STYLE.BG_DARK_GREEN, 'button'), this.templator);
        this.childrens.push(btn);
        const link = new TextLinkComponent(new TextLink(form.linkText, '', form.link), this.templator);
        this.childrens.push(link);
        this.renderToSelector([btn, link], '.card__footer');
    }
}
//# sourceMappingURL=form-card.js.map