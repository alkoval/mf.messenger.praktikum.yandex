export default class FormValidationService {
    constructor() { }
    loginValidator(login) {
        if (login !== null && login !== undefined) {
            if (login.match(/^[0-9a-zA-Z_]{4,12}$/)) {
                return true;
            }
        }
        return false;
    }
    passwordValidator(password) {
        if (password !== null && password !== undefined) {
            if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                return true;
            }
        }
        return false;
    }
    wordValidator(word) {
        if (word !== null && word !== undefined) {
            if (word.match(/^[@0-9a-zA-Zа-яА-Я_\-.:,()<>"'\[\] ]{1,200}$/)) {
                return true;
            }
        }
        return false;
    }
}
//# sourceMappingURL=form-validation.service.js.map