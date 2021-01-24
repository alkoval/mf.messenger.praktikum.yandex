export default class FormValidationService {
    private regex: Map<string, RegExp>;

    constructor() {
        this.regex = new Map();
        this.init();
    }

    private init(): void {
        this.regex.set('login', /^[0-9a-zA-Z_]{4,12}$/);
        this.regex.set('password', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
        this.regex.set('word', /^[@0-9a-zA-Zа-яА-Я_\-.:,()<>"'\[\] ]{1,200}$/);
        this.regex.set('email', /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
        this.regex.set('phone', /^[0-9]{1,10}$/);
    }

    public isValid(type: string, value: string): boolean {
        if (value !== null && value !== undefined) {
            if (this.regex.has(type)) {
                if (value.match(this.regex.get(type)!)) {
                    return true;
                }
            }
        }
        return false;
    }
}
