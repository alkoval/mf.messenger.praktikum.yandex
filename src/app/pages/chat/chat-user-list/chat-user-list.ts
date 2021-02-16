import { BaseComponent } from "../../../core/base-component/base-component.js";
import { Templator } from "../../../core/core.js";
import { PropsComponent } from "../../../shared/shared.interfaces.js";
import { ChatUserListTemplate } from "./chat-user-list.template.js";


export class ChatUserListComponent extends BaseComponent {

    constructor(props: PropsComponent, templator: Templator) {
        super(props, templator, new ChatUserListTemplate());
    }

    public subscribeOnChildrens(): void {
        const items = this.getElement().querySelectorAll('.list__text');
        for (let item of items) {
            //@ts-ignore
            item.addEventListener('click', (e) => { this.selected(e.target as HTMLElement) })
        }
    }

    public selected(elem: HTMLElement): void {
        const id = elem.getAttribute('data-id');
        if (id) {
            this.getEventEmitter().emit('user-list-selected', id);
        }
    }
}