import { BaseComponent } from "../../../core/base-component/base-component";
import { Templator } from "../../../core/core";
import { PropsComponent } from "../../interfaces/props-component";
import { FormField } from "../../models/form-field";
import { FormFieldTemplate } from "./form-field.template";
import FormValidationService from "../../../core/services/form-validation.service";

export class FormFieldComponent extends BaseComponent {
  private formField: FormField;
  private formValidationService: FormValidationService;

  constructor(props: PropsComponent, templator: Templator) {
    super(props, templator, new FormFieldTemplate());
    this.formField = props.root as FormField;
    this.formValidationService = new FormValidationService();
  }

  public subscribe(): void {
    const input = this.getContent().querySelector(".form-field__input");
    if (input !== null) {
      input.addEventListener("blur", (e) => {
        if (e.target !== null) {
          const elem: HTMLInputElement = e.target as HTMLInputElement;
          this.formField.value = elem.value;
          if (
            this.formValidationService.isValid(
              this.formField.validType,
              this.formField.value
            )
          ) {
            elem.classList.remove("form-field__input_invalid");
          } else {
            elem.classList.add("form-field__input_invalid");
          }
        }
      });
      input.addEventListener("focus", (e) => {
        if (e.target !== null) {
          const elem: HTMLInputElement = e.target as HTMLInputElement;
          elem.classList.remove("form-field__input_invalid");
        }
      });
    }
  }
}
