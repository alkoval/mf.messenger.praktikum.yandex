import { BaseComponent } from '../../../core/base-component/base-component.js';
import { Templator } from '../../../core/core.js';
import { PropsComponent } from '../../../shared/interfaces/props-component.js';
import { HistoryImgMessageTemplate } from './history-img-message.template.js';

export class HistoryImgMessageComponent extends BaseComponent {

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new HistoryImgMessageTemplate());
    }
}