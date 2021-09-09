class settingsForm {
    parent = "custom-aria2-settings-container";
    constructor() {

    }
    static getInstance() {
        return new this();
    }
    create(parent, element) {
        let label = this._createLabel(element.name, element.id)
        let input = this._createInput(element);
        //let saveBtn = this._createSaveBtn(element.id);
        let cancelBtn = this._createCancelBtn("has-content");
        let container = this._createContainer(element.id);
        [label, input, cancelBtn].forEach(ele => {
            container.appendChild(ele);
        })
        let button;
        if (button = parent.querySelector('button.add-custom-aria2-settings')) {
            return parent.insertBefore(container, button);
        }
        return parent.appendChild(container);
    }

    createCustomInput(keyId, valueId) {
        let div = this._createContainer(keyId + "-container")
        div.appendChild(this._createInput({ id: keyId }));
        div.appendChild(this._createInput({ id: valueId }));
        div.appendChild(this._createCancelBtn());
        return div;
    }

    createInput(element) {
        let div = document.createElement("div");
        div.classList.add(this.parent);
        /*  element.forEach(element => {
               let label = document.createElement('label');
               label.setAttribute("for", element.id);
               let text = document.createTextNode(element.name);
               label.appendChild(text);
               div.appendChild(label);
             // div.appendChild(this._createInput(element));
          });*/
        div.appendChild(this._createInput(element));
        let button = document.createElement("button");
        //button.setAttribute("type",'button')
        button.classList.add("icon-close");
        div.appendChild(button);
        button = document.createElement("input");
        button.setAttribute('type', 'button');
        button.setAttribute('value', 'save');
        button.setAttribute("data-rel", this.parent);
        div.appendChild(button);
        return div;

    }
    _createContainer(id) {
        let div = document.createElement("div");
        div.classList.add(id);
        return div;
    }
    _createCancelBtn(className = '') {
        let button = document.createElement("button");
        if (className)
            button.classList.add(className);
        //button.setAttribute("type",'button')
        button.classList.add("icon-close");
        return button;
    }
    _createSaveBtn(id) {
        let button = document.createElement("input");
        button.setAttribute('type', 'button');
        button.setAttribute('value', 'save');
        button.setAttribute("data-rel", id + "-container");
        return button;
    }
    _createLabel(name, id) {
        name = name.replace('_', '-');
        let label = document.createElement("lable");
        label.setAttribute("for", id);
        let text = document.createTextNode(name);
        label.appendChild(text);
        return label;
    }
    _createInput(data) {
        let input = document.createElement('input');
        let type = data.type || "text";
        let placeholder = data.placeholder || '';
        let value = data.value || placeholder;
        input.setAttribute('type', type);
        input.setAttribute('id', data.id);
        input.setAttribute("name", data.name || data.id);
        if (type === 'text') {
            input.setAttribute('value', value);
            input.setAttribute('placeholder', value);
        }
        input.classList.add('form-input-' + type);
        return input;
    }

    render(data) {
        let parent = document.getElementById(this.parent)
        for (const element of data) {
            this.create(parent, element)
        }
    }

}

export default settingsForm