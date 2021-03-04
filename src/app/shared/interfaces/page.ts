export interface Page {
  render(): string;
  getContent(): HTMLElement | null;
}
