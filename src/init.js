import i18next from 'i18next';
import handler from './handlers.js';
import watchedState from './watchers.js';
import resources from './locales/ru.js';
import { updateFeed } from './service.js';

export default () => {
  i18next.init({
    lng: 'ru',
    debug: true,
    resources,
  });
  const state = {
    links: [],
    errorKey: '',
    validationStatus: null,
    feeds: [],
    posts: [],
    uiState: {
      modal: '',
    },
    seenPosts: '',
    renderStatus: 'finish',
  };
  handler(watchedState(state));
  setTimeout(() => updateFeed(state), 5000);
};
