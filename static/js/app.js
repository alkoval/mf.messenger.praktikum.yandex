import { NavServise, Templator } from './core/core.js';
class UserAccount {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}
const navService = new NavServise();
console.log(navService);
const user = new UserAccount("Murphy", 1);
console.log(user);
const templator = new Templator();
console.log(templator.compile("Name: {{name}}", { name: "Nils" }));
//# sourceMappingURL=app.js.map