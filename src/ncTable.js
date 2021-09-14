import helper from './helper'
import { translate as t, translatePlural as n } from '@nextcloud/l10n'

class ncTable {
    actionLink = true;
    bodyClass = "ncdownloader-table-data";
    rowClass = "table-row";
    headingClass = "table-heading";
    cellClass = "table-cell";
    //this is the parent element the table is going to append to
    tableContainer = 'ncdownloader-table-wrapper';
    numRow;
    table;

    constructor(heading, rows) {
        this.table = document.getElementById(this.tableContainer);
        if (heading && rows) {
            this.table.innerHTML = '';
            this.rows = rows;
            this.heading = heading;
            this.actionButtons = [];
        }
    }
    static getInstance(heading, row) {
        return new ncTable(heading, row);
    }
    create() {
        let thead = this.createHeading()
        let tbody = this.createRow();
        this.table.appendChild(thead);
        this.table.appendChild(tbody);
        return this;
    }
    clear() {
        this.table.innerHTML = '';
    }
    loading() {
        let htmlStr = '<div class="text-center"><div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span></div></div>'
        this.table.innerHTML = htmlStr;
        return this;
    }
    noData() {
        this.clear();
        let div = document.createElement('div');
        div.classList.add("no-items");
        div.appendChild(document.createTextNode(t("ncdownloader", 'No items')));
        this.table.appendChild(div);
    }
    createHeading(prefix = "table-heading") {
        let thead = document.createElement("section");
        thead.classList.add(this.headingClass);
        let headRow = document.createElement("header");
        headRow.classList.add(this.rowClass);
        thead.classList.add(this.headingClass);
        this.heading.forEach(name => {
            let rowItem = document.createElement("div");
            rowItem.classList.add(prefix + "-" + name.toLowerCase());
            rowItem.classList.add(this.cellClass);
            let text = document.createTextNode(t("ncdownloader", helper.ucfirst(name)));
            rowItem.appendChild(text);
            headRow.appendChild(rowItem);
        })
        thead.appendChild(headRow);
        return thead;
    }
    createRow() {
        let tbody = document.createElement("section");
        tbody.classList.add(this.bodyClass);
        tbody.classList.add("table-body");
        let row;
        for (const element of this.rows) {
            if (element === null) {
                continue;
            }
            row = document.createElement("div");
            row.classList.add(this.rowClass);
            let text;
            for (let key in element) {
                if (key.substring(0, 4) == 'data') {
                    let name = key.replace("_", "-");
                    row.setAttribute(name, element[key]);
                    row.setAttribute("id", element[key]);
                    continue;
                }
                let rowItem = document.createElement("div");
                rowItem.classList.add(this.cellClass);
                if (key === 'actions') {
                    rowItem.classList.add([this.cellClass, "action-item"].join("-"));
                    let container = document.createElement("div");
                    container.classList.add("button-container");
                    element[key].forEach(value => {
                        if (!value.name) {
                            return;
                        }
                        container.appendChild(this.createActionButton(value.name, value.path));
                    })
                    rowItem.appendChild(container);
                    row.appendChild(rowItem);
                    continue;
                }
                if (typeof element[key] === 'object') {
                    let child = element[key];
                    let div;
                    child.forEach(ele => {
                        div = document.createElement('div');
                        if (helper.isHtml(ele)) {
                            div.innerHTML = ele;
                        } else {
                            text = document.createTextNode(ele);
                            div.appendChild(text);
                        }
                        rowItem.appendChild(div);
                    })
                    rowItem.setAttribute("id", [this.cellClass, key].join("-"));
                    row.appendChild(rowItem);
                    continue;
                }
                text = document.createTextNode(element[key]);
                rowItem.appendChild(text);
                rowItem.setAttribute("id", [this.cellClass, key].join("-"));
                row.appendChild(rowItem);
            }
            tbody.appendChild(row);
        }
        return tbody;

    }

    createActionButton(name, path) {
        let button = document.createElement("button");
        button.classList.add("icon-" + name);
        button.setAttribute("path", path);
        return button;
    }

    createActionCell(cell) {
        let div = document.createElement("div");
        let button = document.createElement("button");
        button.classList.add("icon-more", "action-button");
        button.setAttribute("id", "action-links-button");
        div.classList.add("action-item");
        div.appendChild(button);
        //div.appendChild(actionLinks);
        cell.appendChild(div);
    }
}

export default ncTable;