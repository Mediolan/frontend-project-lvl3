import handler from './handlers.js';
import watchedState from './watchers.js';
import i18next from 'i18next';
import resources from './locales/ru.js';

export default () => {
    i18next.init({
        lng: 'ru',
        debug: true,
        resources,
    });
    const state = {
        feeds: [],
        errorKey: '',
    };
    handler(watchedState(state));
}