import helper from '../utils/helper'
import eventHandler from '../lib/eventHandler';
export default {
    run: function () {

        const clickHandler = (event) => {
            event.stopPropagation();
            event.preventDefault();
            let element = event.target;
            //helper.hideDownload();
            let currentType = helper.getContentTableType();
            let path = element.getAttribute("path");
            let name = element.getAttribute("id");
            //avoid repeated click
            if (currentType === name && helper.isPolling()) {
                return;
            }
            helper.setContentTableType(name);
            let delay;
            if (!['active-downloads', 'ytdl-downloads'].includes(name)) {
                delay = 15000;
            }
            if (name === "ytdl-downloads") {
                helper.pollingYtdl();
            } else {
                helper.polling(delay, path);
            }
        };
        eventHandler.add("click", ".download-queue a", event => clickHandler(event));
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