export class FormField {
    constructor(type, name, label, error, validType, value) {
        this.type = type;
        this.name = name;
        this.label = label;
        this.error = error;
        this.value = value !== undefined ? value : '';
        this.validType = validType;
    }
}
//# sourceMappingURL=form-field.js.map