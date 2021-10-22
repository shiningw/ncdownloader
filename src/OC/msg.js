/**
 * A little class to manage a status field for a "saving" process.
 * It can be used to display a starting message (e.g. "Saving...") and then
 * replace it with a green success message or a red error message.
 *
 * @namespace OC.msg
 */
export default {
	/**
	 * Displayes a "Saving..." message in the given message placeholder
	 *
	 * @param {Object} selector    Placeholder to display the message in
	 */
	startSaving(selector) {
		this.startAction(selector, t('core', 'Saving …'))
	},

	/**
	 * Displayes a custom message in the given message placeholder
	 *
	 * @param {Object} selector    Placeholder to display the message in
	 * @param {string} message    Plain text message to display (no HTML allowed)
	 */
	startAction(selector, message) {
		let el = document.querySelector(selector);
		el.textContent = message;
		el.style.removeProperty("display")
	},

	/**
	 * Displayes an success/error message in the given selector
	 *
	 * @param {Object} selector    Placeholder to display the message in
	 * @param {Object} response    Response of the server
	 * @param {Object} response.data    Data of the servers response
	 * @param {string} response.data.message    Plain text message to display (no HTML allowed)
	 * @param {string} response.status    is being used to decide whether the message
	 * is displayed as an error/success
	 */
	finishedSaving(selector, response) {
		this.finishedAction(selector, response)
	},

	/**
	 * Displayes an success/error message in the given selector
	 *
	 * @param {Object} selector    Placeholder to display the message in
	 * @param {Object} response    Response of the server
	 * @param {Object} response.data Data of the servers response
	 * @param {string} response.data.message Plain text message to display (no HTML allowed)
	 * @param {string} response.status is being used to decide whether the message
	 * is displayed as an error/success
	 */
	finishedAction(selector, response) {
		if (response.status === 'success') {
			this.finishedSuccess(selector, response.data.message)
		} else {
			this.finishedError(selector, response.data.message)
		}
	},

	/**
	 * Displayes an success message in the given selector
	 *
	 * @param {Object} selector Placeholder to display the message in
	 * @param {string} message Plain text success message to display (no HTML allowed)
	 */
	finishedSuccess(selector, message) {
		let el = document.querySelector(selector);
		el.textContent = message;
		if (el.classList.contains("error")) el.classList.remove("error");
		el.classList.add("success");
		this.fadeOut(el);
	},

	/**
	 * Displayes an error message in the given selector
	 *
	 * @param {Object} selector Placeholder to display the message in
	 * @param {string} message Plain text error message to display (no HTML allowed)
	 */
	finishedError(selector, message) {
		let el = document.querySelector(selector);
		el.textContent = message;
		if (el.classList.contains("success")) el.classList.remove("success");
		el.classList.add("error");
	},
	fadeIn(element, duration = 1000) {
		(function increment() {
			element.style.opacity = String(0);
			element.style.removeProperty("display")
			let opacity = parseFloat(element.style.opacity);
			if (opacity !== 1) {
				setTimeout(() => {
					increment(opacity + 0.1);
				}, duration / 10);
			}
		})();
	},

	fadeOut(element, duration = 1000) {
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
	show(el) {
		el.style.display = '';
	},
	hide(el) {
		el.style.display = 'none';
	}
}