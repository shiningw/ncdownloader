import Http from '../lib/http'
import helper from '../utils/helper'
import eventHandler from '../lib/eventHandler'
import Clipboard from '../lib/clipboard'
import '../css/clipboard.scss';

const buttonHandler = (event, type) => {
    let element = event.target;
    event.stopPropagation();
    event.preventDefault();
    let url = element.getAttribute("path");
    let row, data = {};
    let removeRow = true;
    if (element.getAttribute("id") == "download-action-button") {
        helper.loop(helper.getCounters);
        helper.setContentTableType("search-results");
    }
    if (row = element.closest('.table-row-search')) {
        if (element.className == 'icon-clipboard') {
            const clippy = new Clipboard(element, row.dataset.link);
            clippy.Copy();
            return;
        }
        data['text-input-value'] = row.dataset.link;
    } else {
        row = element.closest('.table-row')
        data = row.dataset;
        if (!data.gid) {
            console.log("gid is not set!");
        }
    }
    data['url'] = data["text-input-value"]
    delete data["text-input-value"]
    helper.httpClient(url).setErrorHandler(function (xhr, textStatus, error) {
        console.log(error);
    }).setHandler(function (data) {
        if (data.hasOwnProperty('error')) {
            helper.error(data['error']);
            return;
        }
        if (data.hasOwnProperty('result')) {
            helper.message("Success " + data['result']);
        }
        if (data.hasOwnProperty('message')) {
            helper.message(data.message);
        }
        if (row && removeRow)
            row.remove();
    }).setData(data).send();

}
export default {
    run: function () {
        eventHandler.add("click", "#ncdownloader-table-wrapper", ".table-cell-action-item .button-container button", e => buttonHandler(e, ''));
        eventHandler.add("click", "#ncdownloader-table-wrapper", ".table-row button.icon-clipboard", function (e) {
            let element = e.target;
            const clippy = new Clipboard(element);
            clippy.Copy();
        });
    }
}