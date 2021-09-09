import helper from './helper'
import $ from 'jquery'
import Http from './http'
//import actionLinks from './actionLinks'
import { translate as t, translatePlural as n } from '@nextcloud/l10n'
import inputAction from './inputAction'
import updatePage from './updatePage'
import buttonActions from './buttonActions'
import inputBox from './inputBox'
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

    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            return false;
        }
    }
    );
    inputAction.run();
    updatePage.run();
    buttonActions.run();

    $("#ncdownloader-form-wrapper").append(inputBox.getInstance(t("ncdownloader", 'New Download')).create());
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

});


