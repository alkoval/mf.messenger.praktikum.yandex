import { EventBus } from '../event-bus/event-bus.js';
export var EVENTS;
(function (EVENTS) {
    EVENTS["INIT"] = "init";
    EVENTS["FLOW_CDM"] = "flow:component-did-mount";
    EVENTS["FLOW_RENDER"] = "flow:render";
    EVENTS["FLOW_AFTER_RENDER"] = "flow:after-render";
    EVENTS["FLOW_CDU"] = "flow:component-did-update";
    EVENTS["SUBSCRIVE"] = "subscribe";
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
        this.eventBus.on(EVENTS.SUBSCRIVE, this.subscribe.bind(this));
    }
    init() {
        this.eventBus.emit(EVENTS.FLOW_CDM);
    }
    componentDidMount() {
        this.eventBus.emit(EVENTS.FLOW_RENDER);
    }
    componentDidUpdate() {
        this.eventBus.emit(EVENTS.FLOW_RENDER);
    }
    setProps(props) {
        Object.assign(this.props, props);
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
    }
    prerenderChildrens() {
        this.renderChildrens();
    }
    renderChildrens() {
        if (this.childrens.length > 0) {
            for (let child of this.childrens) {
                this.elem.appendChild(child.getContent());
            }
        }
        this.eventBus.emit(EVENTS.SUBSCRIVE);
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
        this.eventBus.emit(EVENTS.SUBSCRIVE);
    }
    render() { return ''; }
    makePropsProxy(props) {
        const self = this;
        props = new Proxy(props, {
            set(target, prop, val) {
                console.log('setProps');
                target[prop] = val;
                self.eventBus.emit(EVENTS.FLOW_CDU);
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
    subscribe() { }
}
//# sourceMappingURL=base-component.js.map