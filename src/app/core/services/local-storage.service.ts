export default class LocalStorageService {
    constructor() { }

    public getItem(name: string): any | null {
        return JSON.parse(localStorage.getItem(name) || 'null');
    }

    public setItem(name: string, data: object): void {
        localStorage.setItem(name, JSON.stringify(data));
    }

    public delItem(name: string): void {
        localStorage.removeItem(name);
    }
}