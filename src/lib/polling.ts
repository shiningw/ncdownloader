type callback = (...args: any[]) => void

class Polling {
    private static instance: Polling;
    private timeoutID: number;
    private delay: number = 1500;
    private enabled: boolean = false;
    constructor() {
        this.enabled = false;
    }
    static create(): Polling {
        this.instance = this.instance || new Polling();
        return this.instance;
    }

    enable() {
        this.enabled = true;
        return this;
    }
    disable() {
        this.enabled = false;
        return this;
    }
    isEnabled() {
        return this.enabled;
    }
    setDelay(time: number = 1500): Polling {
        this.delay = time;
        return this;
    }

    run(callback: callback, ...args: any[]) {
        this.clear().enable()
        callback(...args);
        let timeoutHandler = () => {
            if (this.enabled) {
                this.run(callback, ...args);
            }
        }
        this.timeoutID = window.setTimeout(timeoutHandler, this.delay);
    }
    clear() {
        if (this.timeoutID)
            window.clearTimeout(this.timeoutID);
        return this;
    }
}

export default Polling;