import { EventBus } from '../event-bus/event-bus.js';

export enum EVENTS {
    INIT = "init",
    FLOW_CDM = "flow:component-did-mount",
    FLOW_RENDER = "flow:render",
    FLOW_CDU = "flow:component-did-update",
}

export interface PropsComponent { }

export default class BaseComponent {
    private eventBus: EventBus;
    private elem: HTMLElement | null;
    private tag: string;
    private props: PropsComponent;

    constructor(tagName: string, props: PropsComponent) {
        this.eventBus = new EventBus();
        this.tag = tagName;
        this.elem = null;
        this.props = this.makePropsProxy(props);
        this.registerEvents();
        this.eventBus.emit(EVENTS.INIT);
    }

    private registerEvents(): void {
        this.eventBus.on(EVENTS.INIT, this.init.bind(this));
        this.eventBus.on(EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
        this.eventBus.on(EVENTS.FLOW_RENDER, this.render.bind(this));
        this.eventBus.on(EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
    }

    private createResources(): void {
        this.elem = this.createDocumentElement();
    }

    public init(): void {
        this.createResources();
        this.eventBus.emit(EVENTS.FLOW_CDM);
    }

    private componentDidMount(): void {
        this.componentDidMount();
        this.eventBus.emit(EVENTS.FLOW_RENDER);
    }

    public componentDidUpdate(oldProps: PropsComponent, newProps: PropsComponent): void {
        if (this.compareProps(oldProps, newProps)) {
            this.eventBus.emit(EVENTS.FLOW_RENDER);
        }
    }

    private compareProps(oldProps: PropsComponent, newProps: PropsComponent): boolean {
        return true;
    }

    public setProps(props: PropsComponent): void {
        Object.assign(this.props, props);
    }

    public getElement(): HTMLElement | null {
        return this.elem;
    }

    // Может переопределять пользователь, необязательно трогать
    public render() { }

    getContent() {
        return this.elem;
    }

    private makePropsProxy(props: PropsComponent): PropsComponent {
        const self = this;
        props = new Proxy(props, {
            set(target: any, prop: string, val: any) {
                const oldProps = target[prop];
                target[prop] = val;
                self.eventBus.emit(EVENTS.FLOW_CDU, oldProps, val);
                return true;
            }
        });
        return props;
    }

    private createDocumentElement(): HTMLElement {
        return document.createElement(this.tag);
    }
}