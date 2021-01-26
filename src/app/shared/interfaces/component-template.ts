export interface ComponentTemplate {
    getContent(): string;
    getTag(): string;
    getCssClass(): string;
}