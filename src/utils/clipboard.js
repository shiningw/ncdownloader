import Tooltip from "../lib/tooltip";

class Clipboard {
    element;
    text;

    constructor(element, text) {
        if (typeof element !== 'string' && !(element instanceof HTMLElement))
            throw ("invalid element!");
        this.element = typeof element == 'object' ? element : document.querySelector(element);
        this.text = text || element.getAttribute("data-text");
    }

    _copy(text) {
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

    ShowMsg(msg) {
        let tip = new Tooltip(this.element, msg);
        let html = tip.create('copy-alert').html();
        document.body.appendChild(html);
        const callback = (element) => {
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