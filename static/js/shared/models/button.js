export var BUTTON_STYLE;
(function (BUTTON_STYLE) {
    BUTTON_STYLE["BG_DARK_GREEN"] = "button_bg_dark-green";
})(BUTTON_STYLE || (BUTTON_STYLE = {}));
export class Button {
    constructor(text, cssClass, type) {
        this.text = text;
        this.cssClass = cssClass;
        this.type = type;
    }
}
//# sourceMappingURL=button.js.map