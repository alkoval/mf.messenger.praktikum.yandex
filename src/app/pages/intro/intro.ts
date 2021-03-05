import { BaseComponent } from "../../core/base-component/base-component";
import { Templator } from "../../core/core";
import { IntroService } from "./intro.service";
import { IntroPageTemplate } from "./intro.template";
import { PropsComponent, OnInit } from "../../shared/shared.interfaces";
import { Router } from "../../core/router/router";

export class IntroPageComponent extends BaseComponent implements OnInit {
  private introService: IntroService;
  private router: Router;

  constructor(props: PropsComponent, templator: Templator) {
    super(props, templator, new IntroPageTemplate());
    this.introService = new IntroService();
    this.router = Router.getInstance();
    this.onInit();
  }

  public onInit(): void {
    this.setProps(this.introService.getLinks());
  }

  public subscribe(): void {
    for (const link of this.getElement().querySelectorAll(
      ".list__item .list__text"
    )) {
      const path = (link as HTMLElement).dataset.path;
      if (path) {
        link.addEventListener("click", () => {
          this.router.go(path);
        });
      }
    }
  }

  public render(): string {
    return this.templator.compile(this.template.getContent(), this.getProps());
  }
}
