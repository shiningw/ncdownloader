class Tooltip {
    id = "ncdownloader-tooltip";
    messageNode: HTMLDivElement;
    style = {
        display: '',
        position: ''
    };
    text: string;
    element: string | Element | HTMLElement;

    constructor(element: string | HTMLElement | Element, text: string) {
        this.element = typeof element == 'object' ? element : document.querySelector(element);
        this.style = {
            position: 'fixed',
            display: 'block',
        }
        this.text = text || this.element.getAttribute("data-text");
    }
    create(id: string) {
        this.messageNode = document.createElement("div");
        this.messageNode.classList.add(this.id);
        this.messageNode.setAttribute("id", this.id);
        this.messageNode.style.display = this.style.display;
        this.messageNode.style.position = this.style.position;
        this.messageNode.style.zIndex = "10000";
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
    setPosition(bottomMargin: number = 20, leftMargin: number = 0) {
        let element = this.element as Element;
        let rect = element.getBoundingClientRect();
        let top = (rect['top'] + bottomMargin) + "px";
        let left = (rect['left'] - leftMargin) + "px";
        this.messageNode.style.top = top;
        this.messageNode.style.left = left
    }
}

export default Tooltip;