import helper from './helper'
import $ from 'jquery'
import Http from './http'
import 'tippy.js/dist/tippy.css';
import { translate as t, translatePlural as n } from '@nextcloud/l10n'
import inputBox from './inputBox'
import nctable from './ncTable'

const basePath = "/apps/ncdownloader";

const createInputBox = (event, type) => {
    event.preventDefault();
    event.stopPropagation();
    //let id = event.target.closest("div").getAttribute('id');
    let inputID = event.target.closest("div").dataset.inputbox;
    let inputElement = inputID ? document.getElementById(inputID) : null;
    if (inputElement) {
        inputElement.remove();
    }
    let height = $(window).scrollTop();
    if (height > 50)
        $("html, body").animate({ scrollTop: 0 }, "fast");
    let name;
    switch (type) {
        case "ytdl":
            name = t("ncdownloader", 'YTDL Download');
            break;
        case "search":
            name = t("ncdownloader", 'Search');
            break;
        default:
            name = t("ncdownloader", 'New Download');
    }
    let container;
    if (type === 'search') {
        container = inputBox.getInstance(name, type).addSpinner().create();
        //container.appendChild(inputBox.createLoading());
    } else {
        container = inputBox.getInstance(name, type).create();
    }
    $("#ncdownloader-form-wrapper").append(container);
}

const toggleButton = element => {
    if (!element.previousSibling) {
        return;
    }
    if (element.style.display === 'none') {
        element.style.display = 'block'
        element.previousSibling.style.display = 'none';
    } else {
        element.style.display = 'none'
        element.previousSibling.style.display = 'block';
    }
}

const inputHandler = (event) => {
    event.preventDefault();
    let element = event.target;
    // element.textContent = '';
    //$(element).append(inputBox.createLoading());
    toggleButton(element);
    let inputData = helper.getData('form-input-wrapper');
    let inputValue = inputData.form_input_text;
    if (inputData.type !== 'search' && !helper.isURL(inputValue) && !helper.isMagnetURI(inputValue)) {
        helper.message(t("ncdownloader", "Invalid url"));
        return;
    }
    if (inputData.type === 'ytdl') {
        helper.message(t("ncdownloader", "YTDL Download initiated"));
    }
    if (inputData.type === 'search') {
        //there is a scheduled 60s-interval update running in the background, this is to prevent it from running when searching
        helper.enabledPolling = 0;
        nctable.getInstance().loading();
    }
    const successCallback = (data, element) => {
        //data = JSON.parse(data.target.response)
        if (data !== null && data.hasOwnProperty("file")) {
            helper.message(t("ncdownloader", "Downloading" + " " + data.file));
        }
        toggleButton(element);
        if (data && data.title) {
            const tableInst = nctable.getInstance(data.title, data.row);
            tableInst.actionLink = false;
            tableInst.rowClass = "table-row-search";
            tableInst.create();
        }
    }
    const path = inputData.path || basePath + "/new";
    let url = helper.generateUrl(path);
    Http.getInstance(url).setData(inputData).setHandler(function (data) {
        successCallback(data, element);
    }).send();
}

export default {
    run: function () {
        $("#app-navigation").on("click", "#new-download-ytdl", (event) => createInputBox(event, 'ytdl'));
        $("#app-navigation").on("click", "#new-download", (event) => createInputBox(event, ''));
        $("#app-navigation").on("click", "#torrent-search-button", (event) => createInputBox(event, 'search'));

        $("#ncdownloader-form-wrapper").on("click", "#form-input-button", (event) => inputHandler(event))
    }
}