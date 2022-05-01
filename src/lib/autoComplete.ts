import eventHandler from "./eventHandler";
type callback = (event: any) => void;
type target = string | Element | HTMLElement | Window | Document
type commonEle = Node | HTMLElement
type listData = Array<string>;
interface sgBox<T extends HTMLElement = HTMLDivElement> {
    box: T;
    maxHeight: number;
    suggestionHeight: number;
};
interface icache {
    [key: string]: any;
}
interface Entity<T extends Node = HTMLInputElement> {
    element: T;
    sgBox: sgBox;
    cache: icache;
    lastValue: string;
};
interface ioptions {
    selector: string | NodeList;
    data: Array<string>;
    sourceHandler: () => listData;
    minChars: number;
    delay: number;
    offsetLeft: number;
    offsetTop: number;
    cache: boolean;
    menuClass: string;
    onSelect: (event: Event, item: string, search: Element) => void;
    renderer: (term: string, search: string) => void;
}
class autoComplete {
    options: ioptions;
    element: Entity;
    elements: Array<Entity> = [];
    static UP = 38;
    static DOWN = 40;
    static ENTER = 13;
    static ESC = 27;
    constructor(options: ioptions) {

        this.options = {
            selector: "",
            sourceHandler: null,
            minChars: 3,
            delay: 150,
            offsetLeft: 0,
            offsetTop: 1,
            cache: true,
            menuClass: '',
            onSelect: function (e, term, item) { },
            data: [],
            renderer: function (item: string, search: string) {
                search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                var re = new RegExp(`(${search.split(' ').join('|')})`, "gi");
                return `<div class="suggestion-item" data-val="${item}">${item.replace(re, "<b>$1</b>")}</div>`;
            }
        };

        Object.assign(this.options, options);
        if (typeof this.options.selector !== 'string' && !(this.options.selector instanceof NodeList))
            throw ("invalid selecor!");
        let nodelist = this.options.selector instanceof NodeList ? this.options.selector : document.querySelectorAll(this.options.selector);
        if (nodelist.length < 1) {
            console.log("no element found for autoComplete")
            return;
        }
        nodelist.forEach((node) => {
            let element: Entity = {
                element: node as HTMLInputElement,
                sgBox: null,
                cache: [],
                lastValue: "",
            };
            this.elements.push(element)

        })
    }
    static getInstance(options: ioptions) {
        return new autoComplete(options);
    }
    run() {
        for (const element of this.elements) {
            this.init(element);
        }
    }
    init(value: Entity) {
        let ele = value.element;
        ele.setAttribute('autocomplete', 'off');
        value.sgBox = this.createSuggestionBox();
        this.attach('resize', window, () => {
            this.updateSuggestionBox(value);
        });
        document.body.appendChild(value.sgBox.box);
        this.live('suggestion-item', 'mouseleave', function (e) {
            var sel = value.sgBox.box.querySelector('.suggestion-item.selected');
            if (sel)
                setTimeout(function () { sel.className = sel.className.replace('selected', ''); }, 20);
        }, value.sgBox.box);

        this.live('suggestion-item', 'mouseover', function (e) {
            var sel = value.sgBox.box.querySelector('.suggestion-item.selected');
            if (sel) {
                sel.classList.remove("selected");
            }
            this.classList.add("selected");
        }, value.sgBox.box);
        const selectHandler = (selected: Element, entity: Entity, e: Event) => {
            if (autoComplete.hasClass(selected, 'suggestion-item')) {
                let v = selected.getAttribute('data-val');
                entity.element.value = v;
                this.options.onSelect(e, v, selected);
                this.hideBox(entity.sgBox.box);
            }
        }
        this.live('suggestion-item', 'mousedown,pointerdown', function (e) {
            e.stopPropagation();
            //this refers to the found element within;
            let selected = this;
            selectHandler(selected, value, e);
        }, value.sgBox.box);

        this.attach('blur', ele, () => this.blurCallback(value));
        this.attach('keydown', ele, (e) => this.keyDownCallback(value, e));
        this.attach('keyup', ele, (e) => this.keyUpCallback(value, e));
        if (!this.options.minChars)
            this.attach('focus', ele, (e) => this.focusCallback(value, e));
    }
    getCache(key: string, cache: icache) {
        let data: listData = [];
        if (!cache) {
            return data;
        }
        if (key in cache) {
            data = cache[key];
        } else {
            //test partial terms against the cache if the full term is not found
            for (let i = 1; i < key.length - this.options.minChars; i++) {
                let part = key.slice(0, key.length - i);
                if (part in cache && !cache[part].length) {
                    data.push(cache[part]);
                }
            }
        }
        return data;
    }
    hideBox(box: HTMLDivElement) {
        box.style.display = 'none';
    }
    showResult(term: string, entity: Entity) {
        term = term.toLowerCase();
        let suggestions: listData = [];
        let data: listData
        if (this.options.sourceHandler) {
            data = this.options.sourceHandler()
        } else {
            data = this.options.data;
        }
        if (!this.options.cache) {
            for (const item of data) {
                if (item.toLowerCase().indexOf(term, 0) !== -1) {
                    suggestions.push(item);
                }
            }
            window.setTimeout(() => this.suggest(term, entity, suggestions), this.options.delay)
        }
        suggestions = this.getCache(term, entity.cache)
        //cache found
        if (suggestions.length >= 1) {
            this.suggest(term, entity, suggestions)
        } else {
            for (const item of data) {
                if (item.toLowerCase().indexOf(term, 0) !== -1) {
                    suggestions.push(item);
                }
            }
            entity.cache[term] = suggestions;
            window.setTimeout(() => this.suggest(term, entity, suggestions), this.options.delay)
        }

    }
    suggest(term: string, entity: Entity, data: any[]) {
        if (!entity) {
            return;
        }
        let sgBox = entity.sgBox;
        if (data.length && term.length >= this.options.minChars) {
            let s = '';
            for (var i = 0; i < data.length; i++) s += this.options.renderer(data[i], term);
            sgBox.box.innerHTML = s;
            this.updateSuggestionBox(entity, false);
        }
        else {
            this.hideBox(sgBox.box);
        }
    }
    updatePosition(ele: HTMLDivElement, ref: HTMLInputElement) {
        let rect = ref.getBoundingClientRect();
        ele.style.left = Math.round(rect.left + (window.pageXOffset || document.documentElement.scrollLeft) + this.options.offsetLeft) + 'px';
        ele.style.top = Math.round(rect.bottom + (window.pageYOffset || document.documentElement.scrollTop) + this.options.offsetTop) + 'px';
        ele.style.width = Math.round(rect.right - rect.left) + 'px';
    }
    updateSuggestionBox(value: Entity, resize?: boolean, sibling?: commonEle) {
        let ele = value.element;
        let sgBox = value.sgBox;
        let box = sgBox.box;
        this.updatePosition(box, ele);
        if (resize && !sibling) {
            return;
        }
        box.style.display = 'block';
        if (!sgBox.maxHeight) {
            sgBox.maxHeight = autoComplete.getMaxHeight(sgBox.box);
        }
        if (!sgBox.suggestionHeight) {
            sgBox.suggestionHeight = (<HTMLDivElement>sgBox.box.querySelector('.suggestion-item')).offsetHeight;
        }

        if (!sgBox.suggestionHeight) {
            return;
        }
        if (!sibling) {
            sgBox.box.scrollTop = 0;
            return;
        }

        let scrTop = sgBox.box.scrollTop
        let gap = (<HTMLDivElement>sibling).getBoundingClientRect().top - sgBox.box.getBoundingClientRect().top;
        if (gap + sgBox.suggestionHeight - sgBox.maxHeight > 0) {
            sgBox.box.scrollTop = gap + sgBox.suggestionHeight + scrTop - sgBox.maxHeight;
        } else if (gap < 0) {
            sgBox.box.scrollTop = gap + scrTop;
        }
    }
    static hasClass(el: Element, className: string) {
        return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
    }
    attach(eventType: string, target: target, selector: callback | target, callback?: callback) {
        eventHandler.add(eventType, target, selector, callback);
    }
    live(elClass: string, event: string, cb: callback, context: target) {
        let events: Array<string>;
        if (typeof event === 'string' && event.indexOf(',')) {
            events = event.split(',');
        } else {
            events = [event]
        }
        for (const val of events) {
            this.attach(val, context || window.document, function (e) {
                let el = e.target || e.srcElement;
                let found: boolean;
                while (el && !(found = autoComplete.hasClass(el, elClass))) {
                    el = el.parentElement;
                }
                if (found) cb.call(el, e);
            });
        }
    }
    blurCallback(entity: Entity) {
        let sgBox = entity.sgBox;
        let hoverActive;
        try {
            hoverActive = document.querySelector('.suggestion-container:hover');
        } catch (e) {
            hoverActive = 0;
        }
        if (!hoverActive) {
            entity.lastValue = entity.element.value;
            window.setTimeout(() => this.hideBox(sgBox.box), 350);
        } else if (entity.element !== document.activeElement) {
            window.setTimeout(function () {
                entity.element.focus();
            }, 20);
        }
    }
    //display results matching the term
    keyUpCallback(entity: Entity, e: KeyboardEvent) {
        let sgBox = entity.sgBox, options = this.options;
        var key = window.event ? e.keyCode : e.which;
        if (!key || (key < 35 || key > 40) && ![autoComplete.ENTER, autoComplete.ESC].includes(key)) {
            let val = entity.element.value;
            entity.lastValue = val;
            if (val.length >= options.minChars) {
                this.showResult(val, entity);
            } else {
                this.hideBox(sgBox.box);;
            }
        }
    };
    //capture events when the followings key are pressed(down,up,esc,and tab keys)
    keyDownCallback(entity: Entity, e: KeyboardEvent) {
        let sgBox = entity.sgBox, options = this.options;
        var key = window.event ? e.keyCode : e.which;
        // down =40, up =38
        if ((key == 40 || key == 38) && sgBox.box.innerHTML) {
            let sel = sgBox.box.querySelector('.suggestion-item.selected');
            let next: commonEle;
            if (!sel) {
                next = (key == 40) ? sgBox.box.querySelector('.suggestion-item') : sgBox.box.childNodes[sgBox.box.childNodes.length - 1]; // first : last
                (<HTMLElement>next).className += ' selected';
                entity.element.value = (<HTMLElement>next).getAttribute('data-val');
            } else {
                next = (key == 40) ? sel.nextSibling : sel.previousSibling;
                if (next) {
                    sel.className = sel.className.replace('selected', '');
                    if (next instanceof Element) {
                        next.className += ' selected';
                        entity.element.value = next.getAttribute('data-val');
                    }
                }
                else {
                    sel.className = sel.className.replace('selected', '');
                    entity.element.value = entity.lastValue; next = null;
                }
            }
            this.updateSuggestionBox(entity, false, next);

            //ESC = 27
        } else if (key == 27) {
            entity.element.value = entity.lastValue;
            this.hideBox(sgBox.box);
            //enter = 13,tab = 9
        } else if (key == 13 || key == 9) {
            var sel = sgBox.box.querySelector('.suggestion-item.selected');
            if (sel && sgBox.box.style.display != 'none') {
                options.onSelect(e, sel.getAttribute('data-val'), sel);
                window.setTimeout(() => this.hideBox(sgBox.box), 20);
            }
        }
    }

    focusCallback(entity: Entity, e: KeyboardEvent) {
        entity.lastValue = '\n';
        this.keyUpCallback(entity, e)
    }

    static getMaxHeight(element: Element) {
        let style = getComputedStyle(element, null)
        return parseInt(style.maxHeight);
    }
    createSuggestionBox(): sgBox {
        let sgBox: sgBox = {
            box: document.createElement('div'),
            maxHeight: 0,
            suggestionHeight: 0
        };
        sgBox.box.classList.add('suggestion-container');
        //suggestionBox.classList.add(options.menuClass);
        return sgBox;
    }
}
export default autoComplete;