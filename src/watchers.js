import renderError from "./renders/renderError.js";
import renderFeed from "./renders/renderFeed.js";
import onChange from 'on-change';

const watchedState = (state) => {
  const watcher = onChange(state, (path, value) => {
    switch(path) {
      case 'errorKey':
        renderError(value);
        break
      case 'feeds':
        renderFeed(value);
      default:
        break
    }
  });
  return watcher;
};

export default watchedState;