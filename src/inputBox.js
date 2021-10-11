import { translate as t, translatePlural as n } from '@nextcloud/l10n'
import helper from './helper'


class inputBox {
    path;
    selectOptions = [];
    checkbox = [];
    constructor(btnName, id, path = null) {
        this.btnName = btnName;
        this.id = id;
        this.path = path;
    }
    static getInstance(btnName, id, path = null) {
        return new inputBox(btnName, id, path);
    }
    create() {
        this.formContainer = this._createForm();
        this.textInput = this._createTextInput(this.id);
        this.buttonContainer = this._createButtonContainer();
        this.formContainer.appendChild(this.textInput);
        if (this.checkbox.length !== 0) {
            this.formContainer.appendChild(this._createCheckbox());
        }
        if (this.selectOptions.length !== 0) {
            this.formContainer.appendChild(this._createSelect());
        }
        this.buttonContainer.appendChild(this._createButton());
        this.formContainer.appendChild(this.buttonContainer);
        return this;
    }

    getContainer() {
        return this.formContainer;
    }
    setPath(path) {
        this.path = path;
        return this;
    }
    _createButtonContainer() {
        let div = document.createElement("div");

        div.classList.add("button-container");
        return div;
    }
    _createForm() {
        let container = document.createElement("form");
        container.classList.add("form-input-wrapper");
        container.setAttribute('id', 'form-input-wrapper');
        if (this.path) {
            container.setAttribute('data-path', this.path);
        }
        return container;
    }
    _createSelect(id) {
        id = id || this.id;
        let select = document.createElement('select');
        select.setAttribute('id', "select-value-" + id);
        select.setAttribute('value', '');
        select.classList.add('form-select');
        this.selectOptions.forEach(element => {
            select.appendChild(element);
        });
        return select;
    }

    _createCheckbox() {
        let div = document.createElement("div");
        div.classList.add("checkboxes");
        this.checkbox.forEach(element => {
            div.appendChild(element);
        })
        return div;
    }

    createCheckbox(data) {
        if (!data) {
            return;
        }
        data.forEach(element => {
            let div = document.createElement('div');
            let label = document.createElement('label');
            let text = document.createTextNode(element.label);
            let span = document.createElement('span');
            span.appendChild(text);

            let input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', element.id);
            input.setAttribute('value', 'off');
            input.setAttribute('name', element.name || element.id);

            label.setAttribute('for', element.id);
            label.classList.add("checkbox-label");
            label.appendChild(input);
            label.appendChild(span);
            div.appendChild(label);
            this.checkbox.push(div);
        });
        return this;
    }

    createOptions(data) {
        if (!data) {
            return;
        }
        data.forEach(element => {
            let option = document.createElement('option');
            option.setAttribute('value', element.name);
            let text = document.createTextNode(element.label);
            option.appendChild(text);
            if (element.selected) {
                option.setAttribute("selected", "selected");
            }
            this.selectOptions.push(option);
        });
        return this;
    }
    _createTextInput(id) {
        id = id || 'general';
        let textInput = document.createElement('input');
        textInput.setAttribute('type', 'text');
        textInput.setAttribute('id', "form_input_text");
        textInput.setAttribute('data-type', id);
        textInput.setAttribute('value', '');
        textInput.classList.add('form-input-text');
        switch (id) {
            case 'general':
                textInput.setAttribute('placeholder', t("ncdownloader",'Paste your magnet/http link here'));
                break;
            case 'ytdl':
                textInput.setAttribute('placeholder', t("ncdownloader",'Paste your video link here'));
                break;
            case 'search':
                textInput.setAttribute('placeholder', t("ncdownloader",'Enter your keyword to search'));
                break;
        }
        return textInput;
    }
    _createButton() {
        let button = document.createElement('button');
        button.setAttribute('type', 'submit');
        button.setAttribute('id', 'form-input-button');
        //buttonInput.setAttribute('value', t('ncdownloader', helper.ucfirst(btnName)));
        let text = document.createTextNode(t('ncdownloader', helper.ucfirst(this.btnName)));
        button.appendChild(text);
        return button;
    }
    addSpinner() {
        const parser = new window.DOMParser();
        let htmlString = '<button class="bs-spinner"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" disabled></span><span class="visually-hidden">Loading...</span></button>'
        let doc = parser.parseFromString(htmlString, "text/html")
        let element = doc.querySelector(".bs-spinner");
        element.style.display = 'none';
        this.buttonContainer.appendChild(element);
        return this.formContainer;
    }

}
export default inputBox;