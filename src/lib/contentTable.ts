import helper from '../utils/helper'
interface Map {
    [key: string]: string | {} | Array<any>
}
type rowData = Array<Map>

class contentTable {
    actionLink: boolean = true;
    bodyClass: string = "ncdownloader-table-data";
    rowClass: string = "table-row";
    headingClass: string = "table-heading";
    cellClass: string = "table-cell";
    //this is the parent element the table is going to append to
    tableContainer: string = 'ncdownloader-table-wrapper';
    numRow: number;
    table: HTMLElement;
    rows: rowData
    heading: Array<string>
    actionButtons: Array<{}>

    constructor(heading: Array<string>, rows: rowData) {
        this.table = document.getElementById(this.tableContainer) as HTMLElement;
        if (heading && rows) {
            this.table.innerHTML = '';
            this.rows = rows;
            this.heading = heading;
        }
    }
    static getInstance(heading: Array<string>, rows: rowData) {
        return new contentTable(heading, rows);
    }
    create(): contentTable {
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
        div.appendChild(document.createTextNode(helper.t('No items')));
        this.table.appendChild(div);
    }
    createHeading(prefix = "table-heading"):HTMLElement {
        let thead = document.createElement("section");
        thead.classList.add(this.headingClass);
        let headRow = document.createElement("header");
        headRow.classList.add(this.rowClass);
        thead.classList.add(this.headingClass);
        this.heading.forEach(name => {
            let rowItem = document.createElement("div");
            rowItem.classList.add(prefix + "-" + name.toLowerCase());
            rowItem.classList.add(this.cellClass);
            let text = document.createTextNode(helper.t(helper.ucfirst(name)));
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
                    if (typeof element[key] == "string") {
                        row.setAttribute(name, (<string>element[key]));
                        row.setAttribute("id", (<string>element[key]));
                    }
                    continue;
                }
                let rowItem = document.createElement("div");
                rowItem.classList.add(this.cellClass);
                if (key === 'actions' && Array.isArray(element[key])) {
                    let tmp = element[key] as Array<any>;
                    rowItem.classList.add([this.cellClass, "action-item"].join("-"));
                    let container = document.createElement("div");
                    container.classList.add("button-container");
                    tmp.forEach(value => {
                        if (!value.name) {
                            return;
                        }
                        let data = value.data || '';
                        container.appendChild(this.createActionButton(value.name, value.path, data));
                    })
                    rowItem.appendChild(container);
                    row.appendChild(rowItem);
                } else if (Array.isArray(element[key])) {
                    let child = element[key] as any[];
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
                } else if (typeof element[key] === "string") {
                    text = document.createTextNode(element[key] as string);
                    rowItem.appendChild(text);
                    rowItem.setAttribute("id", [this.cellClass, key].join("-"));
                    row.appendChild(rowItem);
                }
            }
            tbody.appendChild(row);
        }
        return tbody;

    }

    createActionButton(name: string, path: string, data: string):HTMLElement {
        let button = document.createElement("button");
        button.classList.add("icon-" + name);
        button.setAttribute("path", path);
        button.setAttribute("data", data);
        if (name == 'refresh') {
            name = helper.t('Redownload');
        }
        button.setAttribute("data-tippy-content", helper.ucfirst(name));
        button.setAttribute("title", helper.ucfirst(name));
        return button;
    }

    createActionCell(cell: HTMLElement) {
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

export default contentTable;