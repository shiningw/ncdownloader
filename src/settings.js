import Http from './lib/http'
import OC_msg from './lib/msg'
import {
    generateUrl
} from '@nextcloud/router'
import settingsForm from './lib/settingsForm'
import autoComplete from './lib/autoComplete';
import eventHandler from './lib/eventHandler';
import aria2Options from './utils/aria2Options';
import { options as ytdFullOptions, names as ytdOptions } from './utils/youtubedlOptions';
import helper from './utils/helper';
import './css/autoComplete.css'
'use strict';
import { delegate } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

window.addEventListener('DOMContentLoaded', function () {
    let customOptions = ['ncd_downloader_dir', 'ncd_torrents_dir', 'ncd_seed_ratio', 'ncd_seed_time', 'ncd_rpctoken', 'ncd_yt_binary', 'ncd_aria2_binary'];
    const saveHandler = (e, name) => {
        e.stopImmediatePropagation();
        let element = e.target;
        let data = helper.getData(element.getAttribute("data-rel"));
        let url = generateUrl(data.path);
        delete data.path;
        OC_msg.startSaving('#ncdownloader-message-banner');
        helper.makePair(data, name);
        let badOptions = [];
        if (name === 'youtube-dl-settings') {
            for (let key in data) {
                if (!ytdOptions.includes(key) && !customOptions.includes(key)) {
                    delete data[key];
                    badOptions.push(key)
                }
            }
        } else {
            for (let key in data) {
                if (!aria2Options.includes(key) && !customOptions.includes(key)) {
                    delete data[key];
                    badOptions.push(key)
                }
            }
        }
        if (badOptions.length > 0) {
            OC_msg.finishedError('#ncdownloader-message-banner', 'invalid options: ' + badOptions.join(','));
            return;
        }
        Http.getInstance(url).setData(data).setHandler(function (data) {
            if (data.hasOwnProperty("error")) {
                OC_msg.finishedError('#ncdownloader-message-banner', data.error);
            } else if (data.hasOwnProperty("message")) {
                OC_msg.finishedSuccess('#ncdownloader-message-banner', data.message);
            } else {
                OC_msg.finishedSuccess('#ncdownloader-message-banner', "DONE");
            }
        }).send();
    }
    const addOption = (e, name, options) => {
        e.preventDefault();
        e.stopPropagation();
        let baseName = `${name}-settings`;
        let element = e.target;
        let selector = `#${baseName}-key-1`;
        let form = settingsForm.getInstance();
        let nodeList, key, value;
        nodeList = document.querySelectorAll(`[id^='${baseName}-key']`)
        if (nodeList.length === 0) {
            key = `${baseName}-key-1`;
            value = `${baseName}-value-1`;
        } else {
            let index = nodeList.length + 1;
            key = `${baseName}-key-${index}`;
            value = `${baseName}-value-${index}`;
            selector = `[id^='${baseName}-key']`;
        }
        element.before(form.createCustomInput(key, value));
        try {
            autoComplete.getInstance({
                selector: `[id^='${baseName}-key']`,
                minChars: 1,
                sourceHandler: function () {
                    if (Array.isArray(options)) {
                        return options;
                    }
                    return Object.keys(options);
                },
                renderer: (item, search) => {
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
            OC_msg.finishedError('#ncdownloader-message-banner', error);
        }
    }

    eventHandler.add('click', '.ncdownloader-admin-settings', 'input[type="button"]', (e) => saveHandler(e));
    eventHandler.add('click', '.ncdownloader-personal-settings', 'input[type="button"]', (e) => saveHandler(e));
    eventHandler.add("click", "#custom-aria2-settings-container", "button.save-custom-aria2-settings", (e) => saveHandler(e))
    eventHandler.add("click", "#custom-youtube-dl-settings-container", "button.save-custom-youtube-dl-settings", (e) => saveHandler(e, 'youtube-dl-settings'))

    eventHandler.add('click', '#custom-aria2-settings-container', "button.add-custom-aria2-settings", (e) => addOption(e, 'aria2', aria2Options))
    eventHandler.add('click', '#custom-youtube-dl-settings-container', "button.add-custom-youtube-dl-settings", (e) => addOption(e, 'youtube-dl', ytdFullOptions))


    eventHandler.add('click', '.ncdownloader-personal-settings', 'button.icon-close', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        this.parentNode.remove();
    })
    Http.getInstance(generateUrl("/apps/ncdownloader/personal/aria2/get")).setHandler(function (data) {
        if (!data) {
            return;
        }
        let input = [];
        for (let key in data) {
            if (aria2Options.includes(key))
                input.push({ name: key, value: data[key], id: key });
        }
        settingsForm.getInstance().render(input);
    }).send();

    Http.getInstance(generateUrl("/apps/ncdownloader/personal/youtube-dl/get")).setHandler(function (data) {
        if (!data) {
            return;
        }
        let input = [];
        for (let key in data) {
            input.push({ name: key, value: data[key], id: key });
        }
        settingsForm.getInstance().setParent("custom-youtube-dl-settings-container").render(input);
    }).send();

    const filepicker = function (event) {
        let element = event.target;
        const cb = function (path) {
            if (this.value !== path) {
                this.value = path;
            }
        }.bind(element);
        helper.filepicker(cb)
    }
    eventHandler.add('click', "#ncd_downloader_dir", filepicker);
    eventHandler.add('click', "#ncd_torrents_dir", filepicker);
    delegate('#body-settings',
        { target: '[data-tippy-content]' }
    );
});