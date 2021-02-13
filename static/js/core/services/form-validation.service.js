export default class FormValidationService {
    constructor() {
        this.regex = new Map();
        this.init();
    }
    init() {
        this.regex.set('login', /^[0-9a-zA-Z_]{4,12}$/);
        this.regex.set('password', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/);
        this.regex.set('word', /^[@0-9a-zA-Zа-яА-Я_\-.:,()<>"'\[\] ]{1,200}$/);
        this.regex.set('email', /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
        this.regex.set('phone', /^[0-9]{1,10}$/);
    }
    isValid(type, value) {
        if (value !== null && value !== undefined) {
            if (this.regex.has(type)) {
                if (value.match(this.regex.get(type))) {
                    return true;
                }
            }
        }
        return false;
    }
}
//# sourceMappingURL=form-validation.service.js.map