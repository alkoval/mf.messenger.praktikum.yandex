export default class LocalStorageService {
    constructor() { }
    getItem(name) {
        return JSON.parse(localStorage.getItem(name) || 'null');
    }
    setItem(name, data) {
        localStorage.setItem(name, JSON.stringify(data));
    }
    delItem(name) {
        localStorage.removeItem(name);
    }
}
//# sourceMappingURL=local-storage.service.js.map