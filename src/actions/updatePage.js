import helper from '../utils/helper'
import eventHandler from '../lib/eventHandler';
const basePath = "/apps/ncdownloader/status/";
const tableContainer = ".table";
export default {
    run: function () {

        const clickHandler = (event, type) => {
            event.preventDefault();
            helper.hideDownload();
            let container = document.querySelector(tableContainer);
            let currentType = container.getAttribute("type");
            let path = basePath + type;
            if (type === "youtube-dl") {
                path = "/apps/ncdownloader/youtube/get";
            }
            let name = type + "-downloads";
            //avoid repeated click
            if (currentType === name && helper.isPolling()) {
                return;
            }
            container.setAttribute("type", name);
            container.className = "table " + name;
            let delay = 15000;
            if (['active', 'youtube-dl'].includes(type)) {
                delay = 1500;
            }
            helper.polling(delay, path);
        };
        eventHandler.add("click", ".waiting-downloads a", event => clickHandler(event, 'waiting'));
        eventHandler.add("click", ".complete-downloads a", event => clickHandler(event, 'complete'));
        eventHandler.add("click", ".active-downloads a", event => clickHandler(event, 'active'));
        eventHandler.add("click", ".fail-downloads a", event => clickHandler(event, 'fail'));
        eventHandler.add("click", ".youtube-dl-downloads a", event => clickHandler(event, 'youtube-dl'));
        eventHandler.add("click", "#ncdownloader-table-wrapper", ".download-file-folder", function (event) {
            event.stopPropagation();
            event.preventDefault();
            let ele = event.target;
            let url = ele.getAttribute("href");
            helper.scanFolder().then(() => {
                helper.redirect(url);
            });
        });
    }
}