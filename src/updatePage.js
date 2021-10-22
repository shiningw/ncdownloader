import helper from './helper'
import eventHandler from './eventHandler';
import Http from './http'
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
            if (currentType === name && helper.enabledPolling) {
                return;
            }
            helper.enabledPolling = 1;
            //$(tableContainer).removeClass().addClass("table " + name);
            container.setAttribute("type", name);
            container.className = "table " + name;
            let delay = 15000;
            if (['active', 'youtube-dl'].includes(type)) {
                delay = 1500;
            }
            helper.loop(helper.refresh, delay, ...[path])
        };
        eventHandler.add("click",".waiting-downloads a",event => clickHandler(event, 'waiting'));
        eventHandler.add("click",".complete-downloads a",event => clickHandler(event, 'complete'));
        eventHandler.add("click",".active-downloads a",event => clickHandler(event, 'active'));
        eventHandler.add("click",".fail-downloads a",event => clickHandler(event, 'fail'));
        eventHandler.add("click",".youtube-dl-downloads a",event => clickHandler(event, 'youtube-dl'));
        eventHandler.add("click", "#ncdownloader-table-wrapper",".download-file-folder", function (event) {
            event.stopPropagation();
            const path = "/apps/ncdownloader/update";
            let url = helper.generateUrl(path);
            Http.getInstance(url).setMethod('GET').send();
        });
        helper.polling(function (url) {
            url = helper.generateUrl(url);
            Http.getInstance(url).setMethod('GET').send();
        }, 60000, "/apps/ncdownloader/update");
    }
}