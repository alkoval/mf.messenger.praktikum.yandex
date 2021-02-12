import { BaseComponent } from '../../core/base-component/base-component.js';
import { Templator } from '../../core/core.js';
import { IntroService } from './intro.service.js';
import { IntroPageTemplate } from './intro.template.js';
import { PropsComponent, OnInit } from '../../shared/shared.interfaces.js';
import { Router } from '../../core/router/router.js';

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
        for (let link of this.getElement().querySelectorAll('.list__item .list__text')) {
            const path = (link as HTMLElement).dataset.path;
            if (path) {
                link.addEventListener('click', () => {
                    this.router.go(path);
                });
            }
        }
    }

    public render(): string {
        return this.templator.compile(this.template.getContent(), this.getProps());
    }
}