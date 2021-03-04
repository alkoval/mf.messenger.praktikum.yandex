export default class Templator {
  private static instance: Templator;
  private hb: any;

  constructor() {
    this.hb = Handlebars;
  }

  public static getInstance(): Templator {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  public compile(template: string, options: any): string {
    const tmpl = this.hb.compile(template);
    return tmpl(options);
  }
}
