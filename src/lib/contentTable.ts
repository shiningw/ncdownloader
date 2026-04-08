import helper from '../utils/helper'
interface Map {
    [key: string]: string | {} | Array<any>
}
type rowData = Array<Map>

interface tableMeta {
    pagination?: {
        total?: number;
        perPage?: number;
        page?: number;
        perPageOptions?: number[];
        hasNext?: boolean;
    };
}

type pageChangeHandler = ((page: number, perPage?: number) => void) | null;

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
    meta: tableMeta
    currentPage: number = 1;
    perPage: number = 20;
    perPageOptions: number[] = [25, 50, 100];
    totalRows: number = 0;
    hasNext: boolean = false;
    onPageChange: pageChangeHandler = null;

    constructor(heading: Array<string>, rows: rowData, meta: tableMeta = {}, onPageChange: pageChangeHandler = null) {
        this.table = document.getElementById(this.tableContainer) as HTMLElement;
        if (heading && rows) {
            this.table.innerHTML = '';
            this.rows = rows;
            this.heading = heading;
            this.meta = meta;
            this.totalRows = Number(meta?.pagination?.total || rows.length);
            this.perPage = Number(meta?.pagination?.perPage || 20);
            this.currentPage = Number(meta?.pagination?.page || 1);
            this.hasNext = Boolean(meta?.pagination?.hasNext);
            const options = meta?.pagination?.perPageOptions;
            if (Array.isArray(options) && options.length > 0) {
                this.perPageOptions = options.map((val) => Number(val)).filter((val) => Number.isFinite(val) && val > 0);
            }
            if (!this.perPageOptions.includes(this.perPage)) {
                this.perPageOptions.push(this.perPage);
                this.perPageOptions.sort((a, b) => a - b);
            }
            this.onPageChange = onPageChange;
        }
    }
    static getInstance(heading: Array<string>, rows: rowData, meta: tableMeta = {}, onPageChange: pageChangeHandler = null) {
        return new contentTable(heading, rows, meta, onPageChange);
    }
    create(): contentTable {
        this.table.innerHTML = '';
        let thead = this.createHeading()
        let tbody = this.createRow();
        this.table.appendChild(thead);
        this.table.appendChild(tbody);
        const pagination = this.createPagination();
        if (pagination) {
            this.table.appendChild(pagination);
        }
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
    createHeading(prefix = "table-heading"): HTMLElement {
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
        const serverMode = typeof this.onPageChange === 'function' && this.totalRows > this.rows.length;
        const start = (this.currentPage - 1) * this.perPage;
        const pageRows = serverMode ? this.rows : this.rows.slice(start, start + this.perPage);
        for (const element of pageRows) {
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
                        row.setAttribute("id", key);
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

    createPagination(): HTMLElement | null {
        if (!this.rows) {
            return null;
        }

        const totalKnown = this.totalRows > 0;
        const total = totalKnown ? this.totalRows : this.rows.length;
        const serverMode = typeof this.onPageChange === 'function';
        const canPaginate = serverMode ? (this.currentPage > 1 || this.hasNext) : this.rows.length > this.perPage;

        if (!canPaginate) {
            if (total > 0) {
                const wrap = document.createElement("div");
                wrap.classList.add("ncdownloader-table-summary");
                wrap.textContent = `Found ${total} results`;
                return wrap;
            }
            return null;
        }

        const totalPages = totalKnown ? Math.max(1, Math.ceil(total / this.perPage)) : 0;
        const start = ((this.currentPage - 1) * this.perPage) + 1;
        const end = totalKnown ? Math.min(this.currentPage * this.perPage, total) : ((this.currentPage - 1) * this.perPage) + this.rows.length;

        const wrapper = document.createElement("div");
        wrapper.classList.add("ncdownloader-table-pagination");

        const summary = document.createElement("div");
        summary.classList.add("pagination-summary");
        summary.textContent = totalKnown ? `Showing ${start}-${end} of ${total}` : `Showing ${start}-${end}`;

        const controls = document.createElement("div");
        controls.classList.add("pagination-controls");

        let perPageWrap: HTMLElement | null = null;
        if (this.perPageOptions.length > 1) {
            perPageWrap = document.createElement("label");
            perPageWrap.classList.add("pagination-per-page");
            perPageWrap.textContent = "Rows ";

            const perPageSelect = document.createElement("select");
            perPageSelect.classList.add("pagination-select");
            this.perPageOptions.forEach((value) => {
                const option = document.createElement("option");
                option.value = String(value);
                option.textContent = String(value);
                if (value === this.perPage) {
                    option.selected = true;
                }
                perPageSelect.appendChild(option);
            });
            perPageSelect.addEventListener("change", (event) => {
                const target = event.target as HTMLSelectElement;
                const nextPerPage = Number(target.value || this.perPage);
                if (!Number.isFinite(nextPerPage) || nextPerPage <= 0 || nextPerPage === this.perPage) {
                    return;
                }
                this.perPage = nextPerPage;
                this.currentPage = 1;
                if (serverMode && this.onPageChange) {
                    this.onPageChange(1, this.perPage);
                    return;
                }
                this.create();
            });
            perPageWrap.appendChild(perPageSelect);
        }

        const prev = document.createElement("button");
        prev.classList.add("pagination-button");
        prev.textContent = "Prev";
        prev.disabled = this.currentPage <= 1;
        prev.addEventListener("click", (event) => {
            event.preventDefault();
            if (this.currentPage > 1) {
                const targetPage = this.currentPage - 1;
                if (serverMode && this.onPageChange) {
                    this.onPageChange(targetPage);
                    return;
                }
                this.currentPage = targetPage;
                this.create();
            }
        });

        const page = document.createElement("span");
        page.classList.add("pagination-page");
        page.textContent = totalKnown ? `Page ${this.currentPage}/${totalPages}` : `Page ${this.currentPage}`;

        const next = document.createElement("button");
        next.classList.add("pagination-button");
        next.textContent = "Next";
        next.disabled = totalKnown ? (this.currentPage >= totalPages) : !this.hasNext;
        next.addEventListener("click", (event) => {
            event.preventDefault();
            if (this.currentPage < totalPages) {
                const targetPage = this.currentPage + 1;
                if (serverMode && this.onPageChange) {
                    this.onPageChange(targetPage);
                    return;
                }
                this.currentPage = targetPage;
                this.create();
            }
        });

        controls.appendChild(prev);
        controls.appendChild(page);
        controls.appendChild(next);
        if (perPageWrap) {
            controls.appendChild(perPageWrap);
        }

        wrapper.appendChild(summary);
        wrapper.appendChild(controls);
        return wrapper;
    }

    createActionButton(name: string, path: string, data: string): HTMLElement {
        let button = document.createElement("button");
        button.classList.add("icon-" + name);
        button.setAttribute("path", path);
        button.setAttribute("data", data || "nodata");
        if (name == 'refresh') {
            name = helper.t('Redownload');
        }
        button.setAttribute("data-tippy-content", helper.ucfirst(name));
        button.setAttribute("title", helper.ucfirst(name));
        button.setAttribute("id", name + "-action-button");
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