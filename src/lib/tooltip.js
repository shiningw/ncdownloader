import $ from 'jquery'

class Tooltip {
    id = "ncdownloader-tooltip";
    messageNode;
    style = {};
    text;
    constructor(element, text) {
        if (typeof element !== 'string' && !(element instanceof HTMLElement))
            throw ("invalid element!");
        this.element = typeof element == 'object' ? element : document.querySelector(element);
        this.style = {
            position: 'fixed',
            display: 'block',
        }
        this.text = text || element.getAttribute("data-text");
    }
    create(id) {
        this.messageNode = document.createElement("div");
        this.messageNode.classList.add(this.id);
        this.messageNode.setAttribute("id", this.id);
        this.messageNode.style.display = this.style.display;
        this.messageNode.style.position = this.style.position;
        this.messageNode.style.zIndex = 10000;
        let div = document.createElement('div');
        div.setAttribute("id", id);
        let text = document.createTextNode(this.text);
        div.appendChild(text);
        this.messageNode.appendChild(div);
        this.setPosition();
        return this;
    }
    render() {
        document.body.appendChild(this.messageNode);
    }
    html() {
        return this.messageNode;
    }
    setPosition(bottomMargin, leftMargin) {
        bottomMargin = bottomMargin || 20;
        leftMargin = leftMargin || 0;
        let rect = this.element.getBoundingClientRect();
        let top = (rect['top'] + bottomMargin) + "px";
        let left = (rect['left'] - leftMargin) + "px";
        this.messageNode.style.top = top;
        this.messageNode.style.left = left
    }
}

export default Tooltip;