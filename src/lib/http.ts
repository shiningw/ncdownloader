type httpData = {
    [key: string]: any
}
type httpMethod = "POST" | "HEAD" | "GET";
type handler = (data: any) => void;
type httpClient = XMLHttpRequest;
type requestOptions = {
    [key: string]: any;
    headers: Headers;
}
export const Http = class {
    data: httpData;
    url: string;
    method: httpMethod;
    contentType: string;
    client: httpClient;
    handler: handler;
    errorHandler: handler;
    legacyHttp: boolean;
    headers: Headers

    constructor(url: string, legacyHttp: boolean = false) {
        this.url = url;
        this.method = 'POST';
        this.data = null;
        this.contentType = 'application/json';
        this.legacyHttp = legacyHttp
        if (!legacyHttp) {
            this.headers = new Headers();
        }
    }
    isFetchAPISupported() {
        return (typeof fetch == 'function')
    }
    static create(url: string, legacyHttp: boolean = false) {
        return new Http(url, legacyHttp);
    }
    setData(data: httpData) {
        this.data = data
        return this
    }
    setContentType(value: string) {
        this.contentType = value;
        return this;
    }
    send() {
        let token = this.getToken();
        if (!this.isFetchAPISupported() || this.legacyHttp) {
            this.client = new XMLHttpRequest();
            this.client.open(this.method, this.url);
            if (this.contentType)
                this.setHeader('Content-Type', this.contentType);
            if (token) {
                this.setHeader('requesttoken', token)
                this.setHeader('OCS-APIREQUEST', 'true')
            }
            let callback = this.handler;
            this.client.onreadystatechange = () => {
                if (this.client.readyState === XMLHttpRequest.DONE) {
                    let status = this.client.status;
                    const contentType = this.client.getResponseHeader("Content-Type")
                    if (status === 0 || (status >= 200 && status < 400)) {
                        if (typeof callback === 'function' && contentType.indexOf("application/json") !== -1) {
                            callback(JSON.parse(this.client.response));
                        }
                        else {
                            callback(this.client.response);
                        }
                    }
                }
            }
            this.client.onerror = this.errorHandler;
            let params = this.data ? JSON.stringify(this.data) : null
            this.client.send(params);
        } else {
            let options = this.getRequestOpts();
            fetch(options).then(response => {
                if (response.status !== 200) {
                    console.log('Network failures. Status Code: ' + response.status);
                    return;
                }
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    response.json().then(data => {
                        this.handler(data)
                    })
                } else {
                    response.text().then(data => {
                        this.handler(data)
                    })
                }

            }).catch(this.errorHandler)
        }

    }
    setHeader(key: string, val: string) {
        if (this.legacyHttp) {
            this.client.setRequestHeader(key, val)
        } else {
            this.headers.set(key, val);
        }
    }
    appendHeader(key: string, val: string) {
        this.headers.append(key, val);
    }
    getRequestOpts() {
        this.setHeader('content-type', this.contentType);
        let token;
        if (token = this.getToken()) {
            this.setHeader('requesttoken', token)
            this.setHeader('OCS-APIREQUEST', 'true')
        }
        if (this.method == 'POST' && this.data) {
            var body = JSON.stringify(this.data);
        }
        let options: requestOptions = {
            headers: this.headers,
            method: this.method,
            body: body,
            mode: 'cors',
            cache: 'default'
        }
        return new Request(this.url, options);
    }
    getToken() {
        if (typeof document == "undefined") {
            return null
        }
        return window.document.getElementsByTagName('head')[0].getAttribute('data-requesttoken')
    }
    setUrl(url: string) {
        this.url = url
        return this
    }
    setMethod(method: httpMethod) {
        this.method = method
        return this
    }
    setHandler(handler: handler) {
        this.handler = handler || function (data) { };
        return this;
    }
    setErrorHandler(handler: handler) {
        this.errorHandler = handler || function (error) { console.log(error) };
        return this;
    }
    upload(file: File) {
        const fd = new FormData();
        this.client.open(this.method, this.url, true);
        let callback = this.handler;
        this.client.onload = () => {
            if (typeof callback === 'function')
                callback(JSON.parse(this.client.response));
        }
        fd.append('torrentfile', file);
        return this.client.send(fd);
    }
}

export default Http