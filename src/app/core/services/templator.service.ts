export default class Templator {
    private hb: any;

    constructor() {
        // @ts-ignore: Не уверен, что это хорошая идея
        this.hb = Handlebars;
    }

    public compile(template: string, options: any): string {
        const tmpl = this.hb.compile(template);
        return tmpl(options);
    }
}