
import { translate as t } from '@nextcloud/l10n'
type Response = {
    data: { message: string };
    status: string;
}
export default {
    startSaving(selector: string) {
        this.startAction(selector, t('core', 'Saving …'))
    },

    startAction(selector: string, message: string) {
        let el = document.querySelector(selector) as HTMLElement;
        el.style.removeProperty("display")
        el.textContent = message;
    },

    finishedSaving(selector: string, response: Response) {
        this.finishedAction(selector, response)
    },

    finishedAction(selector: string, response: Response) {
        if (response.status === 'success') {
            this.finishedSuccess(selector, response.data.message)
        } else {
            this.finishedError(selector, response.data.message)
        }
    },

    finishedSuccess(selector: string, message: string) {
        let el = document.querySelector(selector);
        el.textContent = message;
        if (el.classList.contains("error")) el.classList.remove("error");
        el.classList.add("success");
        this.fadeOut(el);
    },

    finishedError(selector: string, message: string) {
        let el = document.querySelector(selector);
        el.textContent = message;
        if (el.classList.contains("success")) el.classList.remove("success");
        el.classList.add("error");
    },
    fadeIn(element: HTMLElement, duration = 1000) {
        (function increment() {
            element.style.opacity = String(0);
            element.style.removeProperty("display")
            let opacity = parseFloat(element.style.opacity);
            if (opacity !== 1) {
                setTimeout(() => {
                    opacity += 0.1
                    increment();
                }, duration / 10);
            }
        })();
    },

    fadeOut(element: HTMLElement, duration = 1000) {
        let opacity = parseFloat(element.style.opacity) || 1;
        (function decrement() {
            if ((opacity -= 0.1) < 0) {
                element.style.display = 'none'
                element.style.removeProperty('opacity');
            } else {
                setTimeout(() => {
                    decrement();
                }, duration / 10);
            }
        })();
    },
    show(el: HTMLElement) {
        el.style.display = '';
    },
    hide(el: HTMLElement) {
        el.style.display = 'none';
    }
}