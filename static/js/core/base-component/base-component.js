import { EventBus } from '../event-bus/event-bus.js';
export var EVENTS;
(function (EVENTS) {
    EVENTS["INIT"] = "init";
    EVENTS["FLOW_CDM"] = "flow:component-did-mount";
    EVENTS["FLOW_RENDER"] = "flow:render";
    EVENTS["FLOW_AFTER_RENDER"] = "flow:after-render";
    EVENTS["FLOW_CDU"] = "flow:component-did-update";
    EVENTS["SET_DATASET"] = "set:dataset";
    EVENTS["SUBSCRIBE"] = "subscribe";
    EVENTS["SUBSCRIBE_ON_CHILDRENS"] = "subscribe-on-childrens";
    EVENTS["SHOWN"] = "shown";
})(EVENTS || (EVENTS = {}));
export class BaseComponent {
    constructor(props, templator, template) {
        this.templator = templator;
        this.template = template;
        this.childrens = [];
        this.eventBus = new EventBus();
        this.elem = this.createDocumentElement();
        this.props = this.makePropsProxy(props);
        this.registerEvents();
        this.eventBus.emit(EVENTS.INIT);
    }
    registerEvents() {
        this.eventBus.on(EVENTS.INIT, this.init.bind(this));
        this.eventBus.on(EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
        this.eventBus.on(EVENTS.FLOW_RENDER, this.prerender.bind(this));
        this.eventBus.on(EVENTS.FLOW_AFTER_RENDER, this.prerenderChildrens.bind(this));
        this.eventBus.on(EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
        this.eventBus.on(EVENTS.SET_DATASET, this.setDataset.bind(this));
        this.eventBus.on(EVENTS.SUBSCRIBE, this.subscribe.bind(this));
        this.eventBus.on(EVENTS.SUBSCRIBE_ON_CHILDRENS, this.subscribeOnChildrens.bind(this));
    }
    getEventEmitter() {
        return this.eventBus;
    }
    init() {
        this.eventBus.emit(EVENTS.FLOW_CDM);
        this.eventBus.emit(EVENTS.SET_DATASET);
    }
    componentDidMount() {
        this.eventBus.emit(EVENTS.FLOW_RENDER);
    }
    componentDidUpdate() {
        this.eventBus.emit(EVENTS.FLOW_RENDER);
    }
    setProps(props) {
        Object.assign(this.props, props);
        this.eventBus.emit(EVENTS.FLOW_CDU);
    }
    getProps() {
        return this.props;
    }
    getElement() {
        return this.elem;
    }
    getContent() {
        return this.elem;
    }
    prerender() {
        this.elem.innerHTML = this.render();
        this.eventBus.emit(EVENTS.FLOW_AFTER_RENDER);
        this.eventBus.emit(EVENTS.SUBSCRIBE);
    }
    prerenderChildrens() {
        this.renderChildrens();
        this.afterRenderChildrens();
    }
    afterRenderChildrens() {
        this.eventBus.emit(EVENTS.SUBSCRIBE_ON_CHILDRENS);
    }
    renderChildrens() {
        if (this.childrens.length > 0) {
            for (let child of this.childrens) {
                this.elem.appendChild(child.getContent());
            }
        }
    }
    renderChildrensToSelector(selector) {
        if (this.childrens.length > 0) {
            const root = this.elem.querySelector(selector);
            if (root !== null) {
                for (let child of this.childrens) {
                    root.appendChild(child.getContent());
                }
            }
        }
    }
    renderToSelector(childrens, selector) {
        if (childrens.length > 0) {
            const root = this.elem.querySelector(selector);
            if (root !== null) {
                for (let child of childrens) {
                    root.appendChild(child.getContent());
                }
            }
        }
    }
    renderToRoot(childrens) {
        for (let child of childrens) {
            this.getElement().appendChild(child.getContent());
        }
    }
    render() {
        return this.templator.compile(this.template.getContent(), this.getProps().root);
    }
    makePropsProxy(props) {
        props = new Proxy(props, {
            get(target, prop) {
                let value = target[prop];
                return (typeof value === 'function') ? value.bind(target) : value;
            },
            set(target, prop, val) {
                target[prop] = val;
                return true;
            }
        });
        return props;
    }
    createDocumentElement() {
        const elem = document.createElement(this.template.getTag());
        elem.className = this.template.getCssClass();
        return elem;
    }
    setDataset() { }
    subscribe() { }
    subscribeOnChildrens() { }
    creatred() { }
    show() {
        this.eventBus.emit(EVENTS.SHOWN, this);
    }
    hide() {
        this.elem.remove();
    }
    toggle() {
    }
}
//# sourceMappingURL=base-component.js.map