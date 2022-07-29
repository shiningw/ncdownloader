import eventHandler from './lib/eventHandler';
import helper from './utils/helper';
import './css/autoComplete.css'
import './css/settings.scss'
import { delegate } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { createApp } from 'vue';
import adminSettings from './adminSettings';
import personalSettings from './personalSettings';

const customSettings = createApp(adminSettings)
const pSettings = createApp(personalSettings)
customSettings.mount('#ncdownloader-admin-settings')
pSettings.mount('#ncdownloader-personal-settings')

window.addEventListener('DOMContentLoaded', function () {

    const filepicker = function (event) {
        let element = event.target;
        const cb = function (path) {
            if (this.value !== path) {
                this.value = path;
            }
        }.bind(element);
        helper.filepicker(cb)
    }
    eventHandler.add('click', "#ncd_downloader_dir", filepicker);
    eventHandler.add('click', "#ncd_torrents_dir", filepicker);
    delegate('#body-settings',
        { target: '[data-tippy-content]' }
    );
});