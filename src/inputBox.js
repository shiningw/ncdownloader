import { translate as t, translatePlural as n } from '@nextcloud/l10n'
import helper from './helper'


class inputBox {
    constructor(name, id) {
        this.name = name;
        this.container = this._createForm();
        this.textInput = this._createTextInput(id);
        this.controlsContainer = this._createControlsContainer();
    }
    static getInstance(name, id) {
        return new inputBox(name, id);
    }
    create() {
        this.container.appendChild(this.textInput);
        this.controlsContainer.appendChild(this._createControls());
        this.container.appendChild(this.controlsContainer);
        return this.container;
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
        return this;
    }

}
export default inputBox;