import { EventBus } from '../event-bus/event-bus.js';
import { PropsComponent } from '../../shared/interfaces/props-component.js';
import { ComponentTemplate } from '../../shared/interfaces/component-template.js';
import { Component } from '../../shared/interfaces/component.js';
import Templator from '../services/templator.service.js';

export enum EVENTS {
    INIT = "init",
    FLOW_CDM = "flow:component-did-mount",
    FLOW_RENDER = "flow:render",
    FLOW_AFTER_RENDER = "flow:after-render",
    FLOW_CDU = "flow:component-did-update",
    SET_DATASET = "set:dataset",
    SUBSCRIVE = "subscribe",
    SHOWN = "shown"
}
export abstract class BaseComponent implements Component {
    private eventBus: EventBus;
    private elem: HTMLElement;
    private props: PropsComponent;
    public templator: Templator;
    public template: ComponentTemplate;
    public childrens: BaseComponent[];

    constructor(props: PropsComponent, templator: Templator, template: ComponentTemplate) {
        this.templator = templator;
        this.template = template;
        this.childrens = [];
        this.eventBus = new EventBus();
        this.elem = this.createDocumentElement();
        this.props = this.makePropsProxy(props);
        this.registerEvents();
        this.eventBus.emit(EVENTS.INIT);
    }

    private registerEvents(): void {
        this.eventBus.on(EVENTS.INIT, this.init.bind(this));
        this.eventBus.on(EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
        this.eventBus.on(EVENTS.FLOW_RENDER, this.prerender.bind(this));
        this.eventBus.on(EVENTS.FLOW_AFTER_RENDER, this.prerenderChildrens.bind(this));
        this.eventBus.on(EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
        this.eventBus.on(EVENTS.SET_DATASET, this.setDataset.bind(this));
        this.eventBus.on(EVENTS.SUBSCRIVE, this.subscribe.bind(this));
    }

    public getEventEmitter(): EventBus {
        return this.eventBus;
    }

    public init(): void {
        this.eventBus.emit(EVENTS.FLOW_CDM);
        this.eventBus.emit(EVENTS.SET_DATASET);
    }

    private componentDidMount(): void {
        this.eventBus.emit(EVENTS.FLOW_RENDER);
    }

    public componentDidUpdate(): void {
        this.eventBus.emit(EVENTS.FLOW_RENDER);
    }

    public setProps(props: PropsComponent): void {
        Object.assign(this.props, props);
        this.eventBus.emit(EVENTS.FLOW_CDU);
    }

    public getProps(): PropsComponent {
        return this.props;
    }

    public getElement(): HTMLElement {
        return this.elem;
    }

    public getContent() {
        return this.elem;
    }

    public prerender(): void {
        this.elem.innerHTML = this.render();
        this.eventBus.emit(EVENTS.FLOW_AFTER_RENDER);
    }

    public prerenderChildrens(): void {
        this.renderChildrens();
    }

    public renderChildrens(): void {
        if (this.childrens.length > 0) {
            for (let child of this.childrens) {
                this.elem.appendChild(child.getContent());
            }
        }
        this.eventBus.emit(EVENTS.SUBSCRIVE);
    }

    public renderChildrensToSelector(selector: string): void {
        if (this.childrens.length > 0) {
            const root = this.elem.querySelector(selector);
            if (root !== null) {
                for (let child of this.childrens) {
                    root.appendChild(child.getContent());
                }
            }
        }
        this.eventBus.emit(EVENTS.SUBSCRIVE);
    }

    public renderToSelector(childrens: BaseComponent[], selector: string): void {
        if (childrens.length > 0) {
            const root = this.elem.querySelector(selector);
            if (root !== null) {
                for (let child of childrens) {
                    root.appendChild(child.getContent());
                }
            }
        }
        this.eventBus.emit(EVENTS.SUBSCRIVE);
    }

    public render(): string { return ''; }

    private makePropsProxy(props: PropsComponent): PropsComponent {
        //const self = this;
        props = new Proxy(props, {
            get(target, prop) {
                //@ts-ignore: Решить вопрос с типом target[prop]
                let value = target[prop];
                return (typeof value === 'function') ? value.bind(target) : value;
            },
            set(target: any, prop: string, val: any) {
                target[prop] = val;
                return true;
            }
        });
        return props;
    }

    private createDocumentElement(): HTMLElement {
        const elem = document.createElement(this.template.getTag());
        elem.className = this.template.getCssClass();
        return elem;
    }

    public setDataset(): void { }

    public subscribe(): void { }

    public creatred(): void { }

    public show(): void {
        this.eventBus.emit(EVENTS.SHOWN, this);
    }

    public hide(): void {
        this.elem.remove();
    }
}