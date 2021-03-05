export class TextLink {
  text: string;
  cssClass: string;
  path: string;

  constructor(text: string, cssClass: string, path: string) {
    this.text = text;
    this.cssClass = cssClass;
    this.path = path;
  }
}
