export enum BUTTON_STYLE {
    BG_DARK_GREEN = "button_bg_dark-green"
}

export class Button {
    text: string;
    cssClass: string;
    type: string;

    constructor(text: string, cssClass: string, type: string) {
        this.text = text;
        this.cssClass = cssClass;
        this.type = type;
    }
}