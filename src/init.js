import i18next from 'i18next';
import handler from './handlers.js';
import watchedState from './watchers.js';
import resources from './locales/ru.js';
import { updateFeed } from './service.js';

export default () => {
  const promise = new Promise((resolve) => {
    const i18Instance = i18next.createInstance();
    i18Instance.init({
      lng: 'ru',
      debug: true,
      resources,
    });
    resolve(i18Instance);
  });
  promise.then((i18nInst) => {
    const state = {
      i18n: i18nInst,
      links: [],
      form: {
        state: 'filling',
        errorKey: null,
      },
      feedLoader: {
        state: 'ready',
        errorKey: null,
      },
      feeds: [],
      posts: [],
      uiState: {
        avtiveModal: null,
        seenPosts: [],
      },
    };
    return state;
  })
    .then((state) => {
      handler(watchedState(state));
      updateFeed(watchedState(state));
    });
};
