import { EventBus } from '../event-bus/event-bus.js';
export var EVENTS;
(function (EVENTS) {
    EVENTS["INIT"] = "init";
    EVENTS["FLOW_CDM"] = "flow:component-did-mount";
    EVENTS["FLOW_RENDER"] = "flow:render";
    EVENTS["FLOW_CDU"] = "flow:component-did-update";
})(EVENTS || (EVENTS = {}));
export class BaseComponent {
    constructor(tag, props, templator, template) {
        this.tag = tag;
        this.templator = templator;
        this.template = template;
        this.eventBus = new EventBus();
        this.elem = this.createDocumentElement();
        this.props = this.makePropsProxy(props);
        this.registerEvents();
        this.eventBus.emit(EVENTS.INIT);
    }
    registerEvents() {
        this.eventBus.on(EVENTS.INIT, this.init.bind(this));
        this.eventBus.on(EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
        this.eventBus.on(EVENTS.FLOW_RENDER, this.preRender.bind(this));
        this.eventBus.on(EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
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
    preRender() {
        this.elem.innerHTML = this.render();
    }
    render() { return ''; }
    getContent() {
        return this.elem;
    }
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
        return document.createElement(this.tag);
    }
}
//# sourceMappingURL=base-component.js.map