import { XhrHeader } from "./xhr-header";

export interface HttpRequestOptions {
  method?: string;
  sync?: boolean;
  body?: string | unknown;
  headers?: XhrHeader;
  timeout?: number;
}
