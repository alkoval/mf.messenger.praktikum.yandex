import { BaseComponent } from "../../../core/base-component/base-component";
import { FormValidationService, Templator } from "../../../core/core";
import { PropsComponent } from "../../interfaces/props-component";
import { FormField } from "../../models/form-field";
import { ProfileGroupInputTemplate } from "./profile-group-input.template";

export class ProfileGroupInputComponent extends BaseComponent {
  private formField: FormField;
  private formValidationService: FormValidationService;

  constructor(props: PropsComponent, templator: Templator) {
    super(props, templator, new ProfileGroupInputTemplate());
    this.formField = props.root as FormField;
    this.formValidationService = new FormValidationService();
  }

  public subscribe(): void {
    const input = this.getContent().querySelector(".profile__input");
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
            elem.classList.remove("profile__input_invalid");
          } else {
            elem.classList.add("profile__input_invalid");
          }
        }
      });
      input.addEventListener("focus", (e) => {
        if (e.target !== null) {
          const elem: HTMLInputElement = e.target as HTMLInputElement;
          elem.classList.remove("profile__input_invalid");
        }
      });
    }
  }
}
