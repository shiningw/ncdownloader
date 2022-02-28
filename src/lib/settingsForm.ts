type dataItems = {
    name: string;
    value: any;
    id: string;
    type?: "text" | "button" | "radio" | "checkbox";
    placeholder?: string;
}
type data = Array<dataItems>

class settingsForm {
    parent = "custom-aria2-settings-container";
    constructor() {

    }
    static getInstance() {
        return new this();
    }
    setParent(selector: string): settingsForm {
        this.parent = selector;
        return this;
    }
    create(parent: HTMLElement, element: dataItems) {
        let label = this._createLabel(element.name, element.id)
        let input = this._createInput(element);
        //let saveBtn = this._createSaveBtn(element.id);
        let cancelBtn = this._createCancelBtn("has-content");
        let container = this._createContainer(element.id);
        [label, input, cancelBtn].forEach(ele => {
            container.appendChild(ele);
        })

        return parent.prepend(container);
    }

    createCustomInput(keyId: string, valueId: string): HTMLElement {
        let div = this._createContainer(keyId + "-container")
        let items: dataItems = {
            id: keyId,
            name: '',
            value: ''
        }
        div.appendChild(this._createInput(items));
        items.id = valueId
        div.appendChild(this._createInput(items));
        div.appendChild(this._createCancelBtn());
        return div;
    }

    _createContainer(id: string): HTMLElement {
        let div = document.createElement("div");
        div.classList.add(id);
        return div;
    }
    _createCancelBtn(className = ''): HTMLElement {
        let button = document.createElement("button");
        if (className)
            button.classList.add(className);
        //button.setAttribute("type",'button')
        button.classList.add("icon-close");
        return button;
    }
    _createSaveBtn(id: string): HTMLElement {
        let button = document.createElement("input");
        button.setAttribute('type', 'button');
        button.setAttribute('value', 'save');
        button.setAttribute("data-rel", id + "-container");
        return button;
    }
    _createLabel(name: string, id: string): HTMLElement {
        name = name.replace('_', '-');
        let label = document.createElement("lable");
        label.setAttribute("for", id);
        let text = document.createTextNode(name);
        label.appendChild(text);
        return label;
    }
    _createInput(data: dataItems): HTMLElement {
        let input = document.createElement('input');
        let type = data.type || "text";
        let placeholder = data.placeholder || 'Leave empty if no value needed';
        let value = data.value || '';
        input.setAttribute('type', type);
        input.setAttribute('id', data.id);
        input.setAttribute("name", data.name || data.id);
        if (type === 'text') {
            input.setAttribute('value', value);
            input.setAttribute('placeholder', placeholder);
        }
        input.classList.add('form-input-' + type);
        return input;
    }
    render(data: data) {
        let parent = document.getElementById(this.parent)
        for (const element of data) {
            this.create(parent, element)
        }
    }
}

export default settingsForm