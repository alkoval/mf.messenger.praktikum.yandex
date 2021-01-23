export interface Component {
    render(): string;
    getContent(): HTMLElement;
}