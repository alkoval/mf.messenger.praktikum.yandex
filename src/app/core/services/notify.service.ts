import { NotifyComponent } from "../../shared/components/notify/notify";
import { Notify } from "../../shared/interfaces/notify";
import { Templator } from "../core";

export class NotifyService {
  private static instance: NotifyService;
  private selector: string;

  constructor() {
    this.selector = "";
  }

  public static getInstance(): NotifyService {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  public setSelector(selector: string): void {
    this.selector = selector;
  }

  private show(notify: Notify) {
    const root = document.querySelector(this.selector);
    if (root !== null) {
      const notifyComponent: NotifyComponent = new NotifyComponent(
        { root: notify },
        Templator.getInstance()
      );
      root.appendChild(notifyComponent.getContent());
    }
  }

  public notify(message: string, time?: number): void {
    this.show({
      message: message,
      time: time ? time : 5000,
    });
  }
}
