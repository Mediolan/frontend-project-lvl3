import i18next from 'i18next';
import handler from './handlers.js';
import watchedState from './watchers.js';
import resources from './locales/ru.js';

export default () => {
  i18next.init({
    lng: 'ru',
    debug: true,
    resources,
  });
  const state = {
    links: [],
    errorKey: '',
    validationStatus: '',
    feeds: [],
    posts: [],
    uiState: {
      modal: '',
    },
    seenPosts: '',
  };
  handler(watchedState(state));
};
