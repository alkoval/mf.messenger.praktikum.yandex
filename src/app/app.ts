import { NavServise, Templator } from './core/core.js'

interface User {
    name: string;
    id: number;
}

class UserAccount {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
}

const navService = new NavServise();
console.log(navService)

const user: User = new UserAccount("Murphy", 1);
console.log(user)

const templator: Templator = new Templator();
console.log(templator.compile("Name: {{name}}", { name: "Nils" }));