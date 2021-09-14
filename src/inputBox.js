import { translate as t, translatePlural as n } from '@nextcloud/l10n'
import helper from './helper'


class inputBox {
    path;
    constructor(name, id, path = null) {
        this.name = name;
        this.id = id;
        this.path = path;
    }
    static getInstance(name, id, path = null) {
        return new inputBox(name, id, path);
    }
    create() {
        this.container = this._createForm();
        this.textInput = this._createTextInput(this.id);
        this.controlsContainer = this._createControlsContainer();
        this.container.appendChild(this.textInput);
        this.controlsContainer.appendChild(this._createControls());
        this.container.appendChild(this.controlsContainer);
        return this;
    }

    getContainer() {
        return this.container;
    }
    setPath(path) {
        this.path = path;
        return this;
    }
    _createControlsContainer() {
        let div = document.createElement("div");

        div.classList.add("controls-container");
        return div;
    }
    _createForm() {
        let container = document.createElement("form");
        container.classList.add("form-input-wrapper");
        container.setAttribute('id', 'form-input-wrapper');
        return container;
    }
    _createTextInput(id) {
        id = id || 'general';
        let textInput = document.createElement('input');
        textInput.setAttribute('type', 'text');
        textInput.setAttribute('id', "form_input_text");
        textInput.setAttribute('data-type', id);
        textInput.setAttribute('value', '');
        if (this.path) {
            textInput.setAttribute('data-path', this.path);
        }
        textInput.classList.add('form-input-text');
        return textInput;
    }
    _createControls() {
        let button = document.createElement('button');
        button.setAttribute('type', this.name);
        button.setAttribute('id', 'form-input-button');
        //buttonInput.setAttribute('value', t('ncdownloader', helper.ucfirst(name)));
        let text = document.createTextNode(t('ncdownloader', helper.ucfirst(this.name)));
        button.appendChild(text);
        return button;
    }
    addSpinner() {
        const parser = new window.DOMParser();
        let htmlString = '<button class="bs-spinner"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" disabled></span><span class="visually-hidden">Loading...</span></button>'
        let doc = parser.parseFromString(htmlString, "text/html")
        let element = doc.querySelector(".bs-spinner");
        element.style.display = 'none';
        this.controlsContainer.appendChild(element);
        return this.container;
    }

}
export default inputBox;