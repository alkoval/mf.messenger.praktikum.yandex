export class HistoryImgMessageTemplate {
    constructor() {
        this.tag = 'div';
        this.cssClass = 'history__message history__message_type_image';
    }
    getTag() {
        return this.tag;
    }
    getCssClass() {
        return this.cssClass;
    }
    getContent() {
        return `
            <img src="{{src}}" alt="">
            <div class="history__time history__time_bg_gray history__time_position_right-end">
                <time>{{shortTime}}</time>
            </div>
        `;
    }
}
//# sourceMappingURL=history-img-message.template.js.map