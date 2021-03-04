import { EventBus } from "../../core/event-bus/event-bus";

export interface Component {
  render(): string;
  getContent(): HTMLElement;
  hide(): void;
  show(): void;
  getEventEmitter(): EventBus;
}
