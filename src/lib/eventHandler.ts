type callback = (event: any) => void;
type target = string | Element | HTMLElement

const eventHandler = {
    add: function (eventType: string, target: target, selector: string | callback | Element, callback?: callback) {
        if (typeof selector === 'function' && !callback) {
            callback = selector;
            selector = target;
        }
        if (typeof target === 'object') {

            target.addEventListener(eventType, function (e) {
                callback.call(target, e);
            });
            return;
        }
        let items = document.querySelectorAll(target);
        if (!items) {
            return;
        }
        items.forEach(el => {
            el.addEventListener(eventType, function (e) {
                let element = e.target as HTMLElement;
                if (element === this && selector === target) {
                    callback.call(element, e);
                    return;
                }
                for (; element && element != this; element = element.parentElement) {
                    if (typeof selector === "string" && element.matches(selector)) {
                        callback.call(element, e);
                        break;
                    }
                }
            });
        })

    },
    remove: function (element: target, eventType: string, callback: callback) {

        (<Element>element).removeEventListener(eventType, callback);
    }
}
export default eventHandler;
