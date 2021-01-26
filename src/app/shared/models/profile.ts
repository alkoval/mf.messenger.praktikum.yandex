export class Profile {
    public id: number;
    public name: string;
    public secondName: string;
    public nickname: string;
    public avatar: string;
    public login: string;
    public password: string;
    public rePassword: string;
    public email: string;
    public phone: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.secondName = '';
        this.nickname = '';
        this.avatar = '';
        this.login = '';
        this.password = '';
        this.rePassword = '';
        this.email = '';
        this.phone = '';
    }
}