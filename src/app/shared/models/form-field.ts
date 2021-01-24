export class FormField {
    public type: string;
    public name: string;
    public label: string;
    public error: string;
    public value: string;

    constructor(type: string, name: string, label: string, error: string) {
        this.type = type;
        this.name = name;
        this.label = label;
        this.error = error;
        this.value = '';
    }
}