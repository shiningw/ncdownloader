import helper from './helper'
import $ from 'jquery'
import Http from './http'
import { translate as t, translatePlural as n } from '@nextcloud/l10n'
import updatePage from './updatePage'
import buttonActions from './buttonActions'
import './css/style.scss'
import './css/table.scss'
import { createApp } from 'vue'
import App from './App';

'use strict'
const basePath = "/apps/ncdownloader";
$(document).on('ajaxSend', function (elm, xhr, settings) {
    let token = document.getElementsByTagName('head')[0].getAttribute('data-requesttoken')
    if (settings.crossDomain === false) {
        xhr.setRequestHeader('requesttoken', token)
        xhr.setRequestHeader('OCS-APIREQUEST', 'true')
    }
})
window.addEventListener('DOMContentLoaded', function () {

    // inputAction.run();
    updatePage.run();
    buttonActions.run();
    let container = 'ncdownloader-form-container';
    let app = createApp(App);
    let vm = app.mount('#' + container);
    helper.addVue(vm.$options.name, vm);

    $("#start-aria2").on("click", function (e) {
        const path = basePath + "/aria2/start";
        let url = helper.generateUrl(path);
        Http.getInstance(url).setHandler(function (data) {
            helper.aria2Toggle(data);
        }).send();
    })

    $('#ncdownloader-user-settings button').on("click", function (e) {
        let link = helper.generateUrl(e.target.getAttribute('path'));
        window.location.href = link;
    })

    $("#app-navigation").on("click", "#search-download", helper.showDownload);

});




