import onChange from 'on-change';
import renderFeedback from './renders/renderFeedback.js';
import renderModal from './renders/renderModal.js';
import renderFeed from './renders/renderFeed.js';
import renderPosts from './renders/renderPosts.js';
import getData from './service.js';

const watchedState = (state) => {
  const watcher = onChange(state, (path, value, previousValue, applyData) => {
    switch (path) {
      case 'validationStatus':
        renderFeedback(state, value);
        break;
      case 'links':
        getData(watchedState(state), ...applyData.args);
        break;
      case 'feeds':
        renderFeed(...applyData.args);
        break;
      case 'posts':
        renderPosts(applyData.args);
        break;
      case 'uiState.modal':
        renderModal(state, value);
        break;
      default:
        break;
    }
  });
  return watcher;
};

export default watchedState;
