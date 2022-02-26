type httpData = {
    [key: string]: any
}
type httpMethod = "POST" | "HEAD" | "GET";
type handler = (data: any) => void;
const Http = class {
    data: httpData;
    url: string;
    method: httpMethod;
    dataType: string;
    xhr: XMLHttpRequest;
    handler: handler;
    errorHandler: handler;

    constructor(url: string) {
        this.url = url;
        this.method = 'POST';
        this.data = null;
        this.dataType = 'application/json';
        this.xhr = new XMLHttpRequest();
    }
    static getInstance(url: string) {
        return new Http(url);
    }
    setData(data: httpData) {
        this.data = data
        return this
    }
    setDataType(value: string) {
        this.dataType = value;
    }
    send() {
        let token = this.getToken();
        this.xhr.open(this.method, this.url);
        this.xhr.setRequestHeader('requesttoken', token)
        this.xhr.setRequestHeader('OCS-APIREQUEST', 'true')
        if (this.dataType)
            this.xhr.setRequestHeader('Content-Type', this.dataType);
        let callback = this.handler;
        this.xhr.onload = () => {
            if (typeof callback === 'function')
                callback(JSON.parse(this.xhr.response));
        }
        this.xhr.onerror = this.errorHandler;
        this.xhr.send(JSON.stringify(this.data));
    }
    getToken() {
        return document.getElementsByTagName('head')[0].getAttribute('data-requesttoken')
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
        this.errorHandler = handler
        return this;
    }
    upload(file: File) {
        const fd = new FormData();
        this.xhr.open(this.method, this.url, true);
        let callback = this.handler;
        this.xhr.onload = () => {
            if (typeof callback === 'function')
                callback(JSON.parse(this.xhr.response));
        }
        fd.append('torrentfile', file);
        return this.xhr.send(fd);
    }
}

export default Http