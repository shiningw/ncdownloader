class autoComplete {
    options;
    static UP = 38;
    static DOWN = 40;
    static ENTER = 13;
    static ESC = 27;
    static entryClass = ".suggestion-item";
    static entryClassContainer = ".suggestion-container";
    constructor(options) {
        this.options = {
            selector: 0,
            source: 0,
            minChars: 3,
            delay: 150,
            offsetLeft: 0,
            offsetTop: 1,
            cache: 1,
            menuClass: '',
            renderItem: function (item, search) {
                search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                var re = new RegExp(`(${search.split(' ').join('|')})`, "gi");
                return `<div class="suggestion-item" data-val="${item}">${item.replace(re, "<b>$1</b>")}</div>`;
            },
            onSelect: function (e, term, item) { }
        };
        for (let k in this.options) {
            if (options.hasOwnProperty(k)) this.options[k] = options[k];
        }
        if (typeof this.options.selector !== 'string' && !(this.options.selector instanceof NodeList))
            throw ("invalid selecor!");
        this.elements = typeof this.options.selector == 'object' ? this.options.selector : document.querySelectorAll(this.options.selector);
    }
    static getInstance(options) {
        return new autoComplete(options);
    }
    attachData(element) {
        element.rect = element.getBoundingClientRect();
        element.sgBox = this.createSuggestionBox();
        element.options = this.options;
    }
    run() {
        for (const element of this.elements) {
            this.init(element);
        }
    }

    init(element) {
        element.autocompleteAttr = element.getAttribute('autocomplete');
        element.setAttribute('autocomplete', 'off');
        element.cache = {};
        element.lastValue = '';
        this.attachData(element);
        this.attach('resize', window, function (e) {
            autoComplete.updateSuggestionBox(element);
        });
        document.body.appendChild(element.sgBox);
        this.live('suggestion-item', 'mouseleave', function (e) {
            var sel = element.sgBox.querySelector('.suggestion-item.selected');
            if (sel)
                setTimeout(function () { sel.className = sel.className.replace('selected', ''); }, 20);
        }, element.sgBox);

        this.live('suggestion-item', 'mouseover', function (e) {
            var sel = element.sgBox.querySelector('.suggestion-item.selected');
            if (sel) {
                sel.classList.remove("selected");
            }
            this.className += ' selected';
        }, element.sgBox);
        const selectHandler = function (selected, element, e) {
            if (autoComplete.hasClass(selected, 'suggestion-item')) {
                let v = selected.getAttribute('data-val');
                element.value = v;
                element.options.onSelect(e, v, selected);
                element.sgBox.style.display = 'none';
            }
        }
        this.live('suggestion-item', 'mousedown,pointerdown', function (e) {
            e.stopPropagation();
            //this refers to the found element within;
            let selected = this;
            selectHandler(selected, element, e);
        }, element.sgBox);

        this.attach('blur', element, autoComplete.blurCallback);
        this.attach('keydown', element, autoComplete.keyDownCallback);
        this.attach('keyup', element, autoComplete.keyUpCallback);
        if (!this.options.minChars)
            this.attach('focus', element, autoComplete.focusCallback);
    }
    static suggest(element, data) {
        if (!element) {
            return;
        }
        let sgBox = element.sgBox, options = element.options;
        var val = element.value;
        element.cache[val] = data;
        if (data.length && val.length >= options.minChars) {
            var s = '';
            for (var i = 0; i < data.length; i++) s += options.renderItem(data[i], val);
            sgBox.innerHTML = s;
            autoComplete.updateSuggestionBox(element, 0);
        }
        else {
            sgBox.style.display = 'none';
        }
    }
    static hasClass(el, className) {
        return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
    }
    attach(eventType, target, selector, callback) {
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
            if (element === this) {
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
    }
    live(elClass, event, cb, context) {
        if (typeof event === 'string' && event.indexOf(',')) {
            var events = event.split(',');
        }
        for (const event of events) {
            this.attach(event, context || document, function (e) {
                var found, el = e.target || e.srcElement;
                while (el && !(found = autoComplete.hasClass(el, elClass)))
                    el = el.parentElement;
                if (found) cb.call(el, e);
            });
        }
    }
    static blurCallback(e) {
        let element = this
        let sgBox = element.sgBox;
        let hoverActive;
        try {
            hoverActive = document.querySelector('.suggestion-container:hover');
        } catch (e) {
            hoverActive = 0;
        }
        if (!hoverActive) {
            element.lastValue = element.value;
            sgBox.style.display = 'none';
            setTimeout(function () { sgBox.style.display = 'none'; }, 350);
        } else if (element !== document.activeElement) {
            setTimeout(function () {
                element.focus();
            }, 20);
        }
    }
    static keyUpCallback(e) {
        let element = this;
        let sgBox = element.sgBox, options = element.options;
        var key = window.event ? e.keyCode : e.which;
        if (!key || (key < 35 || key > 40) && ![autoComplete.ENTER, autoComplete.ESC].includes(key)) {
            var val = element.value;
            if (val.length >= options.minChars) {
                if (val != element.lastValue) {
                    element.lastValue = val;
                    clearTimeout(element.timer);
                    if (options.cache) {
                        if (val in element.cache) {
                            autoComplete.suggest(element, element.cache[val]); return;
                        }
                        for (var i = 1; i < val.length - options.minChars; i++) {
                            var part = val.slice(0, val.length - i);
                            if (part in element.cache && !element.cache[part].length) {
                                autoComplete.suggest([]);
                                return;
                            }
                        }
                    }
                    const msuggest = function (data) {
                        autoComplete.suggest(element, data);
                    }
                    element.timer = setTimeout(function () { options.source(val, msuggest) }, options.delay);
                }
            } else {
                element.lastValue = val;
                sgBox.style.display = 'none';
            }
        }
    };

    static keyDownCallback(e) {
        let element = this;
        let sgBox = element.sgBox, options = element.options;
        var key = window.event ? e.keyCode : e.which;
        // down =40, up =38
        if ((key == 40 || key == 38) && sgBox.innerHTML) {
            var next, sel = sgBox.querySelector('.suggestion-item.selected');
            if (!sel) {
                next = (key == 40) ? sgBox.querySelector('.suggestion-item') : sgBox.childNodes[scBox.childNodes.length - 1]; // first : last
                next.className += ' selected';
                element.value = next.getAttribute('data-val');
            } else {
                next = (key == 40) ? sel.nextSibling : sel.previousSibling;
                if (next) {
                    sel.className = sel.className.replace('selected', '');
                    next.className += ' selected';
                    element.value = next.getAttribute('data-val');
                }
                else {
                    sel.className = sel.className.replace('selected', '');
                    element.value = element.lastValue; next = 0;
                }
            }
            autoComplete.updateSuggestionBox(element, 0, next);
            return false;
            //ESC = 27
        } else if (key == 27) {
            element.value = element.lastValue;
            sgBox.style.display = 'none';
            //enter = 13,tab = 9
        } else if (key == 13 || key == 9) {
            var sel = sgBox.querySelector('.suggestion-item.selected');
            if (sel && sgBox.style.display != 'none') {
                options.onSelect(e, sel.getAttribute('data-val'), sel);
                setTimeout(function () { sgBox.style.display = 'none'; }, 20);
            }
        }
    }

    static focusCallback(e) {
        let element = this;
        element.lastValue = '\n';
        autoComplete.keyUpCallback(e)
    }

    static getMaxHeight(element) {
        let style = window.getComputedStyle ? getComputedStyle(element, null) : element.currentStyle;
        return parseInt(style.maxHeight);
    }

    static updatePosition(element, rect, options) {
        element.style.left = Math.round(rect.left + (window.pageXOffset || document.documentElement.scrollLeft) + options.offsetLeft) + 'px';
        element.style.top = Math.round(rect.bottom + (window.pageYOffset || document.documentElement.scrollTop) + options.offsetTop) + 'px';
        element.style.width = Math.round(rect.right - rect.left) + 'px';
    }

    static updateSuggestionBox(element, resize, next) {
        let sgBox = element.sgBox, rect = element.getBoundingClientRect(), options = element.options;
        autoComplete.updatePosition(sgBox, rect, options);
        if (resize && !next) {
            return;
        }
        sgBox.style.display = 'block';
        if (!sgBox.maxHeight) {
            sgBox.maxHeight = autoComplete.getMaxHeight(sgBox);
        }
        if (!sgBox.suggestionHeight) {
            sgBox.suggestionHeight = sgBox.querySelector('.suggestion-item').offsetHeight;
        }

        if (!sgBox.suggestionHeight) {
            return;
        }
        if (!next) {
            sgBox.scrollTop = 0;
            return;
        }

        let scrTop = sgBox.scrollTop
        let selTop = next.getBoundingClientRect().top - sgBox.getBoundingClientRect().top;
        if (selTop + sgBox.suggestionHeight - sgBox.maxHeight > 0) {
            sgBox.scrollTop = selTop + sgBox.suggestionHeight + scrTop - sgBox.maxHeight;
        } else if (selTop < 0) {
            sgBox.scrollTop = selTop + scrTop;
        }
    }
    createSuggestionBox() {
        let sgBox = document.createElement('div');
        sgBox.classList.add('suggestion-container');
        //suggestionBox.classList.add(options.menuClass);
        return sgBox;
    }
}
export default autoComplete;