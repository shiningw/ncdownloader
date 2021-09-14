import helper from './helper'
import $ from 'jquery'
import Http from './http'
const basePath = "/apps/ncdownloader/status/";
const tableContainer = ".table";
export default {
    run: function () {

        const clickHandler = (event, type) => {
            event.preventDefault();
            let path = basePath + type;
            if (type === "youtube-dl") {
                path = "/apps/ncdownloader/youtube/get";
            }
            let name = type + "-downloads";
            //avoid repeated click
            if ($(tableContainer).attr("type") === name && helper.enabledPolling) {
                return;
            }
            helper.enabledPolling = 1;
            $(tableContainer).removeClass().addClass("table " + name);
            $(tableContainer).attr("type", name);
            let delay = 15000;
            if (['active', 'youtube-dl'].includes(type)) {
                delay = 1500;
            }
            helper.loop(helper.refresh, delay, ...[path])
        };
        $(".waiting-downloads").on("click", event => clickHandler(event, 'waiting'));
        $(".complete-downloads").on("click", event => clickHandler(event, 'complete'));
        $(".active-downloads").on("click", event => clickHandler(event, 'active'));
        $(".fail-downloads").on("click", event => clickHandler(event, 'fail'));
        $(".youtube-dl-downloads").on("click", event => clickHandler(event, 'youtube-dl'));

        $("#ncdownloader-table-wrapper").on("click", ".download-file-folder", function (event) {
            event.stopPropagation();
            const path = "/apps/ncdownloader/update";
            let url = helper.generateUrl(path);
            Http.getInstance(url).setMethod('GET').send();
        });

        helper.refresh(basePath + "waiting")
        helper.refresh(basePath + "complete")
        helper.refresh(basePath + "fail")
        helper.refresh("/apps/ncdownloader/youtube/get")

        helper.loop(helper.refresh, 1000, basePath + "active");

        helper.polling(function (url) {
            url = helper.generateUrl(url);
            Http.getInstance(url).setMethod('GET').send();
        }, 60000, "/apps/ncdownloader/update");
    }
}