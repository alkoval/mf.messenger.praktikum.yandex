export default class Templator {
    constructor() {
        this.hb = Handlebars;
    }
    compile(template, options) {
        const tmpl = this.hb.compile(template);
        return tmpl(options);
    }
}
//# sourceMappingURL=templator.service.js.map