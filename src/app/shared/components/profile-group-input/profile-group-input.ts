import { BaseComponent } from '../../../core/base-component/base-component.js';
import { FormValidationService, Templator } from '../../../core/core.js';
import { PropsComponent } from '../../interfaces/props-component.js';
import { FormField } from '../../models/form-field.js';
import { ProfileGroupInputTemplate } from './profile-group-input.template.js';

export class ProfileGroupInputComponent extends BaseComponent {
    private formField: FormField;
    private formValidationService: FormValidationService;

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ProfileGroupInputTemplate());
        this.formField = props.root as FormField;
        this.formValidationService = new FormValidationService();
    }

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps().root);
    }

    public subscribe(): void {
        const input = this.getContent().querySelector('.profile__input');
        if (input !== null) {
            input.addEventListener('blur', (e) => {
                if (e.target !== null) {
                    //@ts-ignore: Подумать, как работать с input без ошибки
                    this.formField.value = e.target.value;
                    if (this.formValidationService.isValid(this.formField.validType, this.formField.value)) {
                        //@ts-ignore: Подумать, как работать с input без ошибки
                        e.target.classList.remove('profile__input_invalid');
                    } else {
                        //@ts-ignore: Подумать, как работать с input без ошибки
                        e.target.classList.add('profile__input_invalid');
                    }
                }
            });
            input.addEventListener('focus', (e) => {
                if (e.target !== null) {
                    //@ts-ignore: Подумать, как работать с input без ошибки
                    e.target.classList.remove('profile__input_invalid');
                }
            });
        }
    }
}