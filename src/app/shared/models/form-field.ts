export class FormField {
  public type: string;
  public name: string;
  public label: string;
  public error: string;
  public value: string;
  public validType: string;

  constructor(
    type: string,
    name: string,
    label: string,
    error: string,
    validType: string,
    value?: string
  ) {
    this.type = type;
    this.name = name;
    this.label = label;
    this.error = error;
    this.value = value ? value : "";
    this.validType = validType;
  }
}
