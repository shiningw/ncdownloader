import Tooltip from "./tooltip";

class Clipboard {
    text: string;
    element: string | Element | HTMLElement;

    constructor(element:string | Element | HTMLElement, text:string) {
        this.element = typeof element == 'object' ? element : document.querySelector(element);
        this.text = text || this.element.getAttribute("data-text");
    }

    _copy(text:string) {
        let textArea = document.createElement("textarea");
        textArea.value = text;

        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        let result;
        try {
            result = document.execCommand('copy');
            //console.log('copied using exceCommand');

        } catch (err) {
            console.error('failed to copy', err);
            result = false;
        } finally {
            document.body.removeChild(textArea);
        }
        if (result) {
            this.ShowMsg("Copied!");
        }
    }

    ShowMsg(msg:string) {
        let tip = new Tooltip(this.element, msg);
        let html = tip.create('copy-alert').html();
        document.body.appendChild(html);
        const callback = (element:Element) => {
            element.remove()
        }
        setTimeout(() => {
            callback(html)
        }, 1000);
    }

    Copy() {
        if (!navigator.clipboard) {
            return this._copy(this.text);
        }
        return navigator.clipboard.writeText(this.text).then(() => {
            this.ShowMsg("Copied!");
        }, function (err) {
            console.error('failed to copy text: ', err);
        });
    }

}

export default Clipboard;