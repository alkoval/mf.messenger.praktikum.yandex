export var METHODS;
(function (METHODS) {
    METHODS["GET"] = "GET";
    METHODS["POST"] = "POST";
    METHODS["PUT"] = "PUT";
    METHODS["PATCH"] = "PATCH";
    METHODS["DELETE"] = "DELETE";
})(METHODS || (METHODS = {}));
export default class HttpService {
    constructor(path) {
        this.host = `https://ya-praktikum.tech/${path}`;
        this.defaultMethod = METHODS.GET;
        this.defaultTimeout = 5000;
        this.defaultHeaders = {
            'Accept': 'application/json, text/javascript, text/plain',
            'Content-Type': 'application/json',
        };
    }
    get(url, queryParams, options) {
        if (queryParams !== null) {
            const queryParamsString = this.prepareQueryParams(queryParams);
            if (queryParamsString) {
                url += !url.indexOf('?') ? '?' : '&';
                url += queryParamsString;
            }
        }
        return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.GET }));
    }
    ;
    post(url, options) {
        return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.POST }));
    }
    ;
    put(url, options) {
        return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.PUT }));
    }
    ;
    patch(url, options) {
        return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.GET }));
    }
    ;
    delete(url, options) {
        return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.GET }));
    }
    ;
    prepareQueryParams(params = {}) {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    }
    request(url, options) {
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
                if (this.status === 200 || this.status === 400) {
                    resolve(xhr.response);
                }
                else {
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
            return xhr.send(options.body ? JSON.stringify(options.body) : null);
        });
    }
    ;
}
//# sourceMappingURL=http.service.js.map