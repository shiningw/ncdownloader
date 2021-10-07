import Http from './http'
import OC_msg from './OC/msg'
import {
    generateUrl
} from '@nextcloud/router'
import settingsForm from './settingsForm'
import autoComplete from './autoComplete';
import eventHandler from './eventHandler';
import aria2Options from './aria2Options';
import helper from './helper';
import './css/autoComplete.css'

'use strict';
window.addEventListener('DOMContentLoaded', function () {

    eventHandler.add('click', '.ncdownloader-admin-settings', 'input[type="button"]', function (event) {
        event.stopPropagation();
        OC_msg.startSaving('#ncdownloader-message-banner');
        const target = this.getAttribute("data-rel");
        let inputData = helper.getData(target);
        const path = inputData.url || "/apps/ncdownloader/admin/save";
        let url = generateUrl(path);
        Http.getInstance(url).setData(helper.getData(target)).setHandler(function () {
            OC_msg.finishedSuccess('#ncdownloader-message-banner', "OK");
        }).send();
    });
    eventHandler.add('click', '.ncdownloader-personal-settings', 'input[type="button"]', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.matches('.custom-aria2-settings-container')) {
            return;
        }
        OC_msg.startSaving('#ncdownloader-message-banner');
        const target = this.getAttribute("data-rel");
        let inputData = helper.getData(target);
        const path = inputData.url || "/apps/ncdownloader/personal/save";
        let url = generateUrl(path);
        Http.getInstance(url).setData(inputData).setHandler(function (data) {
            OC_msg.finishedSuccess('#ncdownloader-message-banner', "OK");
        }).send();
    });
    eventHandler.add('click', '#custom-aria2-settings-container', "button.add-custom-aria2-settings", function (e) {
        e.preventDefault();
        e.stopPropagation();
        let element = e.target;
        let selector = "#aria2-settings-key-1";
        let form = settingsForm.getInstance();
        let nodeList, key, value;
        nodeList = document.querySelectorAll("[id^='aria2-settings-key']")
        if (nodeList.length === 0) {
            key = "aria2-settings-key-1";
            value = "aria2-settings-value-1";
        } else {
            let index = nodeList.length + 1;
            key = "aria2-settings-key-" + index;
            value = "aria2-settings-value-" + index;
            selector = "[id^='aria2-settings-key']";
        }
        element.before(form.createCustomInput(key, value));
        //appended the latest one
        nodeList = document.querySelectorAll("[id^='aria2-settings-key']")
        try {
            autoComplete.getInstance({
                selector: (nodeList.length !== 0) ? nodeList : selector,
                minChars: 1,
                source: function (term, suggest) {
                    term = term.toLowerCase();
                    let suggestions = [], data = aria2Options;
                    for (const item of data) {
                        if (item.toLowerCase().indexOf(term, 0) !== -1) {
                            suggestions.push(item);
                        }
                    }
                    suggest(suggestions);
                }
            }).run();
        } catch (error) {
            console.error(error);
        }
    }
    )

    eventHandler.add("click", "#custom-aria2-settings-container", "button.save-custom-aria2-settings", function (e) {
        e.stopImmediatePropagation();
        let data = helper.getData(this.getAttribute("data-rel"));
        let url = generateUrl(data.path);
        delete data.path;
        OC_msg.startSaving('.message-banner');
        helper.makePair(data);
        Http.getInstance(url).setData(data).setHandler(function (data) {
            OC_msg.finishedSuccess('.message-banner', "OK");
        }).send();
    })
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
});