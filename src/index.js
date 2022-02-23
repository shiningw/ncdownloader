import helper from './utils/helper'
import eventHandler from './lib/eventHandler'
import Http from './lib/http'
import { translate as t, translatePlural as n } from '@nextcloud/l10n'
import updatePage from './actions/updatePage'
import buttonActions from './actions/buttonActions'
import './css/style.scss'
import './css/table.scss'
import { createApp } from 'vue'
import App from './App';
import tippy, { delegate } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
'use strict'
import settingsBar from './settingsBar';
const basePath = "/apps/ncdownloader";


window.addEventListener('DOMContentLoaded', function () {

    helper.showErrors('[data-error-message]');
    updatePage.run();
    buttonActions.run();
    let container = 'ncdownloader-form-wrapper';
    const settingsID = "app-settings-content";
    let app = createApp(App);
    let bar = createApp(settingsBar);

    let values;
    try {
        const barEle = document.getElementById(settingsID);
        let settings = barEle.getAttribute("data-settings");
        values = JSON.parse(settings);
    } catch (e) {
        values = {}
        console.log(e);
    }
    bar.provide('settings', values);
    bar.mount("#" + settingsID);

    let vm = app.mount('#' + container);
    helper.addVue(vm.$options.name, vm);

    eventHandler.add("click", "#start-aria2", "button", function (e) {
        const path = basePath + "/aria2/start";
        let element = e.target
        if (element.classList.contains("notinstalled")) {
            return;
        }
        let parent = element.parentElement;
        let oldHtml = parent.innerHTML;
        parent.innerHTML = helper.loadingTpl();
        let url = helper.generateUrl(path);
        const callback = function (parent, html, data) {
            parent.innerHTML = html;

            if (!data.status) {
                if (data.error)
                    helper.message(data.error);
                return;
            }
            let element = document.querySelector("#start-aria2 button");
            let aria2 = element.getAttribute("data-aria2");
            if (!aria2) {
                return;
            }
            if (aria2 === 'on') {
                element.setAttribute("data-aria2", "off");
                element.textContent = t("ncdownloader", "Start Aria2");
            } else {
                element.setAttribute("data-aria2", "on");
                element.textContent = t("ncdownloader", "Stop Aria2");
            }
        }
        Http.getInstance(url).setHandler(function (data) {
            callback(parent, oldHtml, data);
        }).send();
    })
    eventHandler.add("click", "#app-navigation", "#search-download", helper.showDownload);
    delegate('#app-ncdownloader-wrapper',
        { target: '[data-tippy-content]' }
    );


});




