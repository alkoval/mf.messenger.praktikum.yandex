import { BaseComponent } from "../../core/base-component/base-component";
import { AuthService, Templator } from "../../core/core";
import { PropsComponent } from "../../shared/shared.interfaces";
import { SignUpPageTemplate } from "./signup.template";
import { FormCardComponent } from "../../shared/components/form-card/form-card";
import { FormCard, FormField, Profile } from "../../shared/shared.models";
import FormValidationService from "../../core/services/form-validation.service";
import { Router } from "../../core/router/router";
import { ProfileService } from "../services/profile.service";

export class SignUpPageComponent extends BaseComponent {
  private formComponent: BaseComponent | null;
  public form: FormCard | null;
  private formValidationService: FormValidationService;
  private router: Router;
  private authService: AuthService;
  private profileService: ProfileService;

  constructor(props: PropsComponent, templator: Templator) {
    super(props, templator, new SignUpPageTemplate());
    this.formComponent = null;
    this.form = null;
    this.formValidationService = new FormValidationService();
    this.router = Router.getInstance();
    this.authService = AuthService.getInstance();
    this.profileService = ProfileService.getInstance();
  }

  public prerenderChildrens(): void {
    this.form = new FormCard(
      "Регистрация",
      "Зарегистрироваться",
      "/login",
      "Войти"
    );
    this.form.fields.push(
      new FormField("email", "email", "Почта", "Некорректное значение", "email")
    );
    this.form.fields.push(
      new FormField(
        "text",
        "login",
        "Логин",
        "Латинские символы, цифры, длина 4-12",
        "login"
      )
    );
    this.form.fields.push(
      new FormField("text", "name", "Имя", "Некорректное значение", "word")
    );
    this.form.fields.push(
      new FormField(
        "text",
        "secondName",
        "Фамилия",
        "Некорректное значение",
        "word"
      )
    );
    this.form.fields.push(
      new FormField(
        "text",
        "phone",
        "Телефон",
        "Некорректное значение",
        "phone"
      )
    );
    this.form.fields.push(
      new FormField(
        "password",
        "password",
        "Пароль",
        "@, Латинские символы, цифры, длина от 6",
        "password"
      )
    );
    this.form.fields.push(
      new FormField(
        "password",
        "rePassword",
        "Повторите пароль",
        "Пароли не совпадают",
        "password"
      )
    );
    this.formComponent = new FormCardComponent(
      { root: this.form },
      this.templator
    );
    this.childrens.push(this.formComponent);
    this.renderChildrens();
  }

  public subscribe(): void {
    const form = this.form;
    const button = this.getContent().querySelector(
      ".button, .button_bg_dark-green"
    );
    if (button !== null) {
      button.addEventListener("click", () => {
        this.signin(form);
      });
    }
  }

  public signin(form: FormCard | null): void {
    if (form !== null) {
      let valid = true;
      for (const field of form.fields) {
        if (!this.formValidationService.isValid(field.validType, field.value)) {
          valid = false;
          break;
        }
      }

      valid = Boolean(
        valid &&
          form.fields.find((e) => e.name === "password")!.value ===
            form.fields.find((e) => e.name === "rePassword")!.value
      );

      if (valid) {
        const profile = new Profile();
        profile.name = form.fields.find((e) => e.name === "name")!.value;
        profile.secondName = form.fields.find(
          (e) => e.name === "secondName"
        )!.value;
        profile.email = form.fields.find((e) => e.name === "email")!.value;
        profile.phone = form.fields.find((e) => e.name === "phone")!.value;
        profile.password = form.fields.find(
          (e) => e.name === "password"
        )!.value;
        profile.rePassword = form.fields.find(
          (e) => e.name === "rePassword"
        )!.value;
        profile.login = form.fields.find((e) => e.name === "login")!.value;
        this.authService.signup(profile).then((id) => {
          if (id) {
            this.profileService
              .getInfoProfile(id as number)
              .then((response) => {
                if (response) {
                  this.router.go("/chat");
                }
              });
          }
        });
      }
    }
  }
}
