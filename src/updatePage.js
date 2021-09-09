import helper from './helper'
import $ from 'jquery'
import Http from './http'
const basePath = "/apps/ncdownloader/status/";
const tableContainer = ".table";
export default {
    run: function () {

        const eventHandler = (event, type) => {
            event.preventDefault();
            const path = basePath + type;
            let name = type + "-downloads";
            //avoid repeated click
            if ($(tableContainer).attr("type") === name && helper.enabledPolling) {
                return;
            }
            helper.enabledPolling = 1;
            $(tableContainer).removeClass().addClass("table " + name);
            $(tableContainer).attr("type", name);
            let delay = 15000;
            if (name === "active-downloads") {
                delay = 1500;
            }
            helper.loop(helper.refresh, delay, ...[path])
        };
        $(".waiting-downloads").on("click", event => eventHandler(event, 'waiting'));
        $(".complete-downloads").on("click", event => eventHandler(event, 'complete'));
        $(".active-downloads").on("click", event => eventHandler(event, 'active'));
        $(".fail-downloads").on("click", event => eventHandler(event, 'fail'));

        helper.refresh(basePath + "waiting")
        helper.refresh(basePath + "complete")
        helper.refresh(basePath + "fail")

        helper.loop(helper.refresh, 1000, basePath + "active");

        helper.polling(function (url) {
            url = helper.generateUrl(url);
            Http.getInstance(url).setMethod('GET').send();
        }, 60000, "/apps/ncdownloader/update");
    }
}