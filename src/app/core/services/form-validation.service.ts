export default class FormValidationService {

    constructor() { }

    public loginValidator(login: string): boolean {
        if (login !== null && login !== undefined) {
            if (login.match(/^[0-9a-zA-Z_]{4,12}$/)) {
                return true;
            }
        }
        return false;
    }

    public passwordValidator(password: string): boolean {
        if (password !== null && password !== undefined) {
            if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                return true;
            }
        }
        return false;
    }

    public wordValidator(word: string): boolean {
        if (word !== null && word !== undefined) {
            if (word.match(/^[@0-9a-zA-Zа-яА-Я_\-.:,()<>"'\[\] ]{1,200}$/)) {
                return true;
            }
        }
        return false;
    }
}
