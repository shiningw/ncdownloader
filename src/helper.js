import $ from 'jquery'
import {
    generateUrl
} from '@nextcloud/router'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { translate as t, translatePlural as n } from '@nextcloud/l10n'
import nctable from './ncTable';
import Http from './http'

const helper = {
    generateUrl: generateUrl,
    loop(callback, delay, ...args) {
        callback(...args);
        clearTimeout(helper.timeoutID);
        this.polling(callback, delay, ...args);
    },
    enabledPolling: 1,
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
    polling(callback, delay, ...args) {
        self = this;
        helper.timeoutID = setTimeout(function () {
            if (self.enabledPolling) {
                callback(...args);
                self.polling(callback, delay, ...args);
            }
        }, delay);
    },
    isURL(url) {
        let regex = '^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@|\\d{1,3}(?:\.\\d{1,3}){3}|(?:(?:[a-z\\d\\u{00a1}-\\u{ffff}'
            + ']+-?)*[a-z\\d\\u{00a1}-\\u{ffff}]+)(?:\.(?:[a-z\\d\\u{00a1}-\\u{ffff}]+-?)*[a-z\\d\\u{00a1}-\\u{ffff}]+)*(?:\.'
            + '[a-z\\u{00a1}-\\u{ffff}]{2,6}))(?::\\d+)?(?:[^\\s]*)?$';
        const pattern = new RegExp(regex, 'iu');
        return pattern.test(url);
    },
    isMagnetURI(url) {
        const magnetURI = /^magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32,40}&dn=.+&tr=.+$/i;

        return magnetURI.test(url.trim());
    },
    message: function (message) {
        Toastify({
            text: message,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right,  rgb(26, 28, 27), rgb(126, 138, 105))",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            onClick: function () { } // Callback after click
        }).showToast();
    },
    aria2Toggle: function (data) {
        if (!data.status) {
            return;
        }
        if (!data.status && data.error) {
            return;
        }
        let $element = $("#start-aria2 button");
        let aria2 = $element.attr("data-aria2");
        if (aria2 === 'on') {
            $element.attr("data-aria2", "off").html(t("ncdownloader", "Start Aria2"));
        } else {
            $element.attr("data-aria2", "on").html(t("ncdownloader", "Stop Aria2"));
        }
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
    refresh(path) {
        path = path || "/apps/ncdownloader/status/active";
        let url = helper.generateUrl(path);
        Http.getInstance(url).setHandler(function (data) {
            if (data && data.row) {
                nctable.getInstance(data.title, data.row).create();
            } else {
                nctable.getInstance().noData();
            }
            if (data.counter)
                helper.updateCounter(data.counter);
        }).send();
    },
    html2DOM: function (htmlString) {
        const parser = new window.DOMParser();
        let doc = parser.parseFromString(htmlString, "text/html")
        return doc.querySelector("div");
    },
    makePair: function (data, prefix = "aria2-settings") {
        for (let key in data) {
            let index;
            if ((index = key.indexOf(prefix + "-key-")) !== -1) {
                let valueKey = prefix + "-value-" + key.substring(key.lastIndexOf('-') + 1);
                if (!data[valueKey]) continue;
                let newkey = data[key];
                data[newkey] = data[valueKey];
                delete data[key];
                delete data[valueKey];
            }
        }
    },
    getData(selector) {
        const element = typeof selector === "object" ? selector : document.getElementById(selector)
        const data = {}
        data['path'] = element.getAttribute('path') || '';
        //if the targeted element is not of input or select type, search for such elements below it
        if (!['SELECT', 'INPUT'].includes(element.nodeName.toUpperCase())) {
            const nodeList = element.querySelectorAll('input,select')

            for (let i = 0; i < nodeList.length; i++) {
                const element = nodeList[i]
                if (element.hasAttribute('type') && element.getAttribute('type') === 'button') {
                    continue
                }
                const key = element.getAttribute('id')
                data[key] = element.value
                for (let prop in element.dataset) {
                    data[prop] = element.dataset[prop];
                }
            }
        } else {
            for (let prop in element.dataset) {
                data[prop] = element.dataset[prop];
            }
            const key = element.getAttribute('id')
            data[key] = element.value
        }
        return data;
    }
}
export default helper
