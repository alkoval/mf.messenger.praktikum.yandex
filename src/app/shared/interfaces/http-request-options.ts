import { XhrHeader } from "./xhr-header";

export interface HttpRequestOptions {
    method?: string,
    sync?: boolean,
    body?: string | any,
    headers?: XhrHeader,
    timeout?: number
}