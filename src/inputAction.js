import helper from './helper'
import $ from 'jquery'
import Http from './http'
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
    let name = t("ncdownloader", 'Download'), path;
    switch (type) {
        case "ytdl":
            path = basePath + "/youtube/new";
            break;
        case "search":
            name = t("ncdownloader", 'Search');
            path = basePath + "/search";
            break;
        default:
            path = basePath + "/new";
    }
    let container;
    if (type === 'search') {
        let selectOptions = [];
        selectOptions.push({ name: 'bitSearch', label: 'BITSEARCH', selected: 0 });
        selectOptions.push({ name: 'TPB', label: 'THEPIRATEBAY', selected: 1 });
        container = inputBox.getInstance(name, type, path).createOptions(selectOptions).create().addSpinner();
        //container.appendChild(inputBox.createLoading());
    } else if (type === 'ytdl') {
        let checkbox = [{id:'audio-only',label:'Audio Only'}];
        container = inputBox.getInstance(name, type, path).createCheckbox(checkbox).create().getContainer();
    } else {
        container = inputBox.getInstance(name, type, path).create().getContainer();
    }
    $("#ncdownloader-form-wrapper").append(container);
}

const toggleSpinner = element => {
    let spinner = element.previousSibling || element.nextSibling

    if (!spinner) {
        return;
    }
    if (element.style.display === 'none') {
        element.style.display = 'block'
        spinner.style.display = 'none';
    } else {
        element.style.display = 'none'
        spinner.style.display = 'block';
    }
}

const inputHandler = (event) => {
    event.preventDefault();
    let element = event.target;
    toggleSpinner(element);
    let formWrapper = element.closest('form');

    let inputData = helper.getData('form-input-wrapper');
    let inputValue = inputData.form_input_text;
    if (inputData.type !== 'search' && !helper.isURL(inputValue) && !helper.isMagnetURI(inputValue)) {
        helper.message(t("ncdownloader", "Invalid url"));
        return;
    }
    if (inputData.type === 'ytdl') {
        inputData.audioOnly = document.getElementById('audio-only').checked;
        helper.message(t("ncdownloader", "Your download has started!"), 5000);
    }
    if (inputData.type === 'search') {
        //a scheduled 60s-interval update is running in the background, this is to prevent it from interfering when searching
        helper.enabledPolling = 0;
        nctable.getInstance().loading();
    }
    const successCallback = (data, element) => {
        if (!data) {
            helper.message(t("ncdownloader", "Something must have gone wrong!"));
            return;
        }
        if (data.hasOwnProperty("error")) {
            helper.message(t("ncdownloader", data.error));
        } else if (data.hasOwnProperty("message")) {
            helper.message(t("ncdownloader", data.message));
        } else if (data.hasOwnProperty("file")) {
            helper.message(t("ncdownloader", "Downloading" + " " + data.file));
        }
        if (data && data.title) {
            toggleSpinner(element);
            const tableInst = nctable.getInstance(data.title, data.row);
            tableInst.actionLink = false;
            tableInst.rowClass = "table-row-search";
            tableInst.create();
        }
    }
    const path = formWrapper.dataset.path || basePath + "/new";
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
        $("#ncdownloader-form-wrapper").on("click", "#form-input-button", (event) => inputHandler(event));
    }
}