type dataItems = {
    name: string;
    value: any;
    id: string;
    type?: "text" | "button" | "radio" | "checkbox";
    placeholder?: string;
}
type data = Array<dataItems>

class settingsForm {
    container;
    constructor(containerId?: string) {
        this.container = containerId
    }
    static getInstance(containerId?: string) {
        return new this(containerId);
    }
    setContainer(selector: string): settingsForm {
        this.container = selector;
        return this;
    }
    create(containerEle: HTMLElement, element: dataItems) {
        let label = this._createLabel(element.name, element.id)
        let input = this._createInput(element);
        //let saveBtn = this._createSaveBtn(element.id);
        let cancelBtn = this._createCancelBtn("has-content");
        let wrapper = this._createContainer(element.id);
        [label, input, cancelBtn].forEach(ele => {
            wrapper.appendChild(ele);
        })
        return containerEle.prepend(wrapper);
    }

    createInputGroup(keyId: string, valueId: string): HTMLElement {
        let div = this._createContainer(keyId + "-container")
        let items: dataItems = {
            id: keyId,
            name: '',
            value: '',
            placeholder: ""
        }
        div.appendChild(this._createInput(items));
        items.id = valueId
        items.placeholder = 'Leave empty if no value needed'
        div.appendChild(this._createInput(items));
        div.appendChild(this._createCancelBtn());
        return div;
    }

    _createContainer(id: string): HTMLElement {
        let div = document.createElement("div");
        div.setAttribute("id", id);
        div.classList.add("autocomplete-container")
        return div;
    }
    _createCancelBtn(className = ''): HTMLElement {
        let button = document.createElement("button");
        if (className)
            button.classList.add(className);
        //button.setAttribute("type",'button')
        button.classList.add("icon-close");
        button.addEventListener("click", function () {
            let container = this.parentNode as HTMLElement
            container.remove()
        })
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
        let label = document.createElement("label");
        label.setAttribute("for", id);
        let text = document.createTextNode(name);
        label.appendChild(text);
        return label;
    }
    _createInput(data: dataItems): HTMLElement {
        let input = document.createElement('input');
        let type = data.type || "text";
        let placeholder = data.placeholder;
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
        let container = document.getElementById(this.container)
        if (!container) {
            throw this.container + " is not found"
        }
        for (const element of data) {
            this.create(container, element)
        }
    }
}

export default settingsForm