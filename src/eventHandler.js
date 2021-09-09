const eventHandler = {
    add: function (eventType, target, selector, callback) {
        if (typeof selector === 'function' && !callback) {
            callback = selector;
            selector = target;
        }
        if (typeof target === 'object') {
            if (target.attachEvent) {
                target.attachEvent('on' + eventType, function (e) {
                    callback.call(target, e);
                });
            }
            else {
                target.addEventListener(eventType, function (e) {
                    callback.call(target, e);
                });
            }
            return;
        }
        let el = document.querySelector(target);
        if (!el) {
           return;
        }
        el.addEventListener(eventType, function (e) {
            let element = e.target;
            if (element === this && selector === target) {
                callback.call(element, e);
                return;
            }
            for (; element && element != this; element = element.parentNode) {
                if (element.matches(selector)) {
                    callback.call(element, e);
                    break;
                }
            }
        });
    },
    off: function (element, eventType, callback) {
        element.removeEventListener(eventType, callback);
    }
}
export default eventHandler;
