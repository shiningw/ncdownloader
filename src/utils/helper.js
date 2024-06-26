import {
    generateUrl
} from '@nextcloud/router'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { translate as t, translatePlural as n } from '@nextcloud/l10n'
import contentTable from '../lib/contentTable';
import Http from '../lib/http'
import Polling from "../lib/polling";
import autoComplete from '../lib/autoComplete';

const helper = {
    vue: {},
    addVue(name, object) {
        helper.vue[name] = object;
    },
    getVue(name) {
        return helper.vue[name];
    },
    generateUrl: generateUrl,
    loop(callback, delay = 3000, ...args) {
        Polling.create().setDelay(delay).run(callback, ...args);
    },
    isPolling() {
        return Polling.create().isEnabled();
    },
    enabePolling() {
        Polling.create().enable();
    },
    disablePolling() {
        Polling.create().disable().clear();
    },
    polling(delay = 1500, path) {
        Polling.create().setDelay(delay).run(helper.refresh, path);
    },
    scanFolder(forceScan = false, path = "/apps/ncdownloader/scanfolder") {
        let url = helper.generateUrl(path);
        return new Promise((resolve) => {
            helper.httpClient(url).setData({ "force": forceScan }).setHandler(function (data) {
                resolve(data.status);
            }).send();
        });
    },
    pollingFolder(delay = 1500) {
        Polling.create().setDelay(delay).run(helper.scanFolder);
    },
    pollingYtdl(delay = 1500) {
        Polling.create().setDelay(delay).run(helper.refresh, "/apps/ncdownloader/ytdl/get");
    },
    refresh(path) {
        path = path || "/apps/ncdownloader/status/active";
        let url = helper.generateUrl(path);
        helper.httpClient(url).setHandler(function (data) {
            if (data && data.row) {
                contentTable.getInstance(data.title, data.row).create();
            } else {
                contentTable.getInstance().noData();
            }
            if (data.counter)
                helper.updateCounter(data.counter);
        }).send();
    },
    trim(string, char) {
        return string.split(char).filter(Boolean).join(char)
    },
    isHtml(string) {
        const htmlRegex = new RegExp('^<([a-z]+)[^>]+>(.*?)</\\1>', 'i');
        return htmlRegex.test(string);
    },
    ucfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    },
    isURL(url) {
        try {
            new URL(url.trim());
            return true;
        } catch (e) {
            console.log(e.message);
            return false;
        }
    },
    isMagnetURI(url) {
        const magnetURI = /^magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32,40}(&dn=.+&tr=.+)?$/i;

        return magnetURI.test(url.trim());
    },
    _message: function (message, options = {}) {
        message = message || "Empty"
        const defaults = {
            text: message,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            // backgroundColor: "#295b86",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            onClick: function () { }, // Callback after click
        }
        Object.assign(defaults, options);
        Toastify(defaults).showToast();
    },
    error: function (message, duration = 20000) {
        let options = {
            style: {
                color: '#721c24',
                'background-color': '#f8d7da',
                'border-color': '#f5c6cb',
            },
            duration: duration,
            backgroundColor: '#f8d7da',
        }
        helper._message(message, options);
    },
    info: function (message, duration = 2000) {
        const options = {
            style: {
                color: '#004085',
                'background-color': '#cce5ff',
                'border-color': '#b8daff',
            },
            duration: duration,
            text: message,
            backgroundColor: '#cce5ff',
        }
        helper._message(message, options);
    },
    warn: function (message, duration = 2000) {
        const options = {
            style: {
                color: '#856404',
                'background-color': '#fff3cd',
                'border-color': '#ffeeba',
            },
            duration: duration,
            backgroundColor: '#fff3cd',
        }
        helper._message(message, options);
    },
    message: function (message, duration = 2000) {
        helper.info(message, duration);
    },
    getPathLast: function (path) {
        return path.substring(path.lastIndexOf('/') + 1)
    },
    updateCounter(data) {
        for (let key in data) {
            const counter = document.getElementById(key + "-downloads-counter")
            counter.innerHTML = '<div class="number">' + data[key] + '</div>';
        }
    },
    getCounters() {
        let url = helper.generateUrl("apps/ncdownloader/counters");
        helper.httpClient(url).setMethod("GET").setHandler(function (data) {
            if (data["counter"])
                helper.updateCounter(data["counter"]);
        }).send();
    },
    html2DOM: function (htmlString) {
        const parser = new window.DOMParser();
        let doc = parser.parseFromString(htmlString, "text/html")
        return doc.querySelector("div");
    },
    getData(selector) {
        const element = typeof selector === "object" ? selector : document.getElementById(selector)
        const data = {}
        data['_path'] = element.getAttribute('path') || '';
        //if the targeted element is not of input or select type, search for such elements below it
        if (!['SELECT', 'INPUT'].includes(element.nodeName.toUpperCase())) {
            const nodeList = element.querySelectorAll('input,select')

            for (let i = 0; i < nodeList.length; i++) {
                const element = nodeList[i]
                if (element.hasAttribute('type') && element.getAttribute('type') === 'button') {
                    continue
                }
                const key = element.getAttribute('id') || element.getAttribute('name')
                data[key] = element.value
                for (let prop in element.dataset) {
                    if (prop == "rel") {
                        continue;
                    }
                    data[prop] = element.dataset[prop];
                }
            }
        } else {
            for (let prop in element.dataset) {
                if (prop == "rel") {
                    continue;
                }
                data[prop] = element.dataset[prop];
            }
            const key = element.getAttribute('id') || element.getAttribute('name')
            data[key] = element.value
        }
        return data;
    },
    showElement(prop) {
        let vm = helper.getVue('mainApp');
        vm.$data.display[prop] = true;
        //hide all other elements;
        for (let key in vm.$data.display) {
            if (key !== prop) {
                vm.$data.display[key] = false;
            }
        }
    },
    hideElement(prop) {
        let vm = helper.getVue('mainApp');
        vm.$data.display[prop] = false;
    },
    showDownload() {
        helper.showElement('download');
        contentTable.getInstance().clear();
        //helper.disablePolling();
    },
    hideDownload() {
        helper.hideElement('download');
    },
    topleft(id) {
        let container = typeof id === 'object' ? id : document.getElementById(id);
        container.style.top = 0;
        container.style.left = 0;
        container.style.width = "100%";
    },
    loadingTpl() {
        let html = `<button class="bs-spinner">
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          disabled
        ></span
        ><span class="visually-hidden">Loading...</span>`;
        return html;
    },
    getCssVar(prop) {
        return window.getComputedStyle(document.documentElement).getPropertyValue(prop);
    },
    getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    },
    showErrors(target) {
        let errors = document.querySelectorAll(target);
        errors.forEach(element => {
            let msg;
            if (msg = element.getAttribute('data-error-message'))
                helper.error(msg, 20000);
        })
    },
    str2Boolean: function (str) {
        if (typeof str != "string") {
            return false;
        }

        switch (str.toLowerCase().trim()) {
            case "true":
            case "yes":
            case "1":
                return true;

            case "false":
            case "no":
            case "0":
            case null:
                return false;
            default:
                return Boolean(str);
        }
    },
    t: function (str) {
        return t("ncdownloader", str);
    },
    resetSearch: function (vm) {
        vm.$data.loading = 0;
        contentTable.getInstance([], []).clear();
    },
    redirect(url) {
        window.location.href = url;
    },
    getContentTableType() {
        let container = document.getElementById("ncdownloader-table-wrapper");
        return container.getAttribute("type");
    },
    setContentTableType(name) {
        let container = document.getElementById("ncdownloader-table-wrapper");
        container.setAttribute("type", name);
        container.className = "table " + name;
    },
    filepicker(cb, currentPath) {
        OC.dialogs.filepicker(
            t('ncdownloader', 'Select a directory'),
            cb,
            false,
            'httpd/unix-directory',
            true,
            OC.dialogs.FILEPICKER_TYPE_CHOOSE,
            currentPath
        );
    },
    getSettings(key, defaultValue = null, type = 2) {
        let url = helper.generateUrl("/apps/ncdownloader/getsettings");
        return new Promise(resolve => {
            helper.httpClient(url).setData({ name: key, type: type, default: defaultValue }).setHandler(data => {
                resolve(data)
            }).send()
        })
    },
    httpClient(url) {
        return new Http.create(url, true)
    },
    autoComplete(selector, options) {
        try {
            autoComplete.getInstance({
                selector: selector,
                minChars: 1,
                sourceHandler: function () {
                    if (Array.isArray(options)) {
                        return options;
                    }
                    return Object.keys(options);
                },
                renderer: (item, search) => {
                    if (!item || !search) {
                        return;
                    }
                    search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                    let tippy;
                    if (options.hasOwnProperty(item)) {
                        tippy = options[item];
                    } else {
                        tippy = item;
                    }
                    var re = new RegExp(`(${search.split(' ').join('|')})`, "gi");
                    return `<div data-tippy-content="${tippy}" class="suggestion-item" data-val="${item}">${item.replace(re, "<b>$1</b>")}</div>`;
                }
            }).run();
        } catch (error) {
            console.log(error)
            helper.error(error);
        }
    },
    transformParams(data, prefix = "aria2-settings") {
        let index
        for (let key in data) {
            if (key.charAt(0) == "_") {
                delete data[key]
                continue
            }
            if ((index = key.indexOf(prefix + "-key-")) !== -1) {
                let valueKey = prefix + "-value-" + key.substring(key.lastIndexOf('-') + 1);
                if (data[valueKey] === undefined) continue;
                let newkey = data[key];
                data[newkey] = data[valueKey];
                delete data[key];
                delete data[valueKey];
            }
        }
        return data
    },
    isEmptyObject(obj) {
        return Object.keys(obj).length === 0
    }
}

export default helper
