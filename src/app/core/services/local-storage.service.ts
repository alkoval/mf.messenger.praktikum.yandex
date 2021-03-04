export default class LocalStorageService {
  public getItem(name: string): unknown | null {
    return JSON.parse(localStorage.getItem(name) || "null");
  }

  public setItem(name: string, data: unknown): void {
    localStorage.setItem(name, JSON.stringify(data));
  }

  public delItem(name: string): void {
    localStorage.removeItem(name);
  }
}
