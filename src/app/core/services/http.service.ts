import { HttpRequestOptions } from "../../shared/interfaces/http-request-options";
import { XhrHeader } from "../../shared/interfaces/xhr-header";

export enum METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}

export default class HttpService {
    protected host: string;
    protected defaultMethod: string;
    protected defaultTimeout: number;
    protected defaultHeaders: XhrHeader;

    constructor(path: string) {
        this.host = path;
        this.defaultMethod = METHODS.GET;
        this.defaultTimeout = 5000;
        this.defaultHeaders = {
            'Accept': 'application/json, text/javascript, text/plain',
            'Content-Type': 'application/json',
        };
    }

    public setHost(path: string): void {
        this.host = path;
    }

    public get(url: string, queryParams: any | null, options: HttpRequestOptions): Promise<unknown> {
        if (queryParams !== null) {
            const queryParamsString = this.prepareQueryParams(queryParams);
            if (queryParamsString) {
                url += !url.indexOf('?') ? '?' : '&';
                url += queryParamsString;
            }
        }
        return this.request(url, { ...options, method: METHODS.GET });
    };

    public post(url: string, options: HttpRequestOptions): Promise<unknown> {
        return this.request(url, { ...options, method: METHODS.POST });
    };

    public put(url: string, options: HttpRequestOptions): Promise<unknown> {
        return this.request(url, { ...options, method: METHODS.PUT });
    };

    public patch(url: string, options: HttpRequestOptions): Promise<unknown> {
        return this.request(url, { ...options, method: METHODS.PATCH });
    };

    public delete(url: string, options: HttpRequestOptions): Promise<unknown> {
        return this.request(url, { ...options, method: METHODS.DELETE });
    };

    private prepareQueryParams(params: any = {}): string {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    }

    private request(url: string, options: HttpRequestOptions): Promise<unknown> {
        const method = options.method || this.defaultMethod;
        const headers = options.headers || this.defaultHeaders;
        const timeout = options.timeout || this.defaultTimeout;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, `${this.host}${url}`);

            xhr.withCredentials = true;

            if (headers) {
                Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));
            }

            xhr.timeout = timeout;

            xhr.onload = function () {
                if (this.status === 200 || this.status === 400 || this.status === 409) {
                    resolve(xhr.response);
                } else {
                    reject(new Error(`Ответ от сервера: ${xhr.status} | ${xhr.responseText}`));
                }
            };

            xhr.onerror = function () {
                reject(new Error("Ошибка выполнения запроса."));
            };

            xhr.ontimeout = function () {
                reject(new Error("Истекло время запроса."));
            };

            xhr.onabort = function () {
                reject(new Error("Запрос был прерван."));
            };

            return xhr.send(options.body ? options.body : null);
        });
    };
}