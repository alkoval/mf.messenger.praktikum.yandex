export default class Templator {
    constructor() {
        this.hb = Handlebars;
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
    compile(template, options) {
        const tmpl = this.hb.compile(template);
        return tmpl(options);
    }
}
//# sourceMappingURL=templator.service.js.map