import onChange from 'on-change';
import { formStatusSwitcher, renderFeedback } from './renders/formSectionRender.js';
import renderModal from './renders/renderModal.js';
import renderFeed from './renders/renderFeed.js';
import renderPosts from './renders/renderPosts.js';

const watchedState = (state) => {
  const watcher = onChange(state, (path, value, previousValue, applyData) => {
    switch (path) {
      case 'formMode':
        formStatusSwitcher(value);
        break;
      case 'validationStatus':
        if (value !== null) {
          renderFeedback(watchedState(state), value);
        }
        break;
      case 'feeds':
        renderFeed(...applyData.args, state.i18n);
        break;
      case 'posts':
        renderPosts(applyData.args, state.i18n);
        break;
      case 'uiState.activeModal':
        renderModal(state, value);
        break;
      default:
        break;
    }
  });
  return watcher;
};

export default watchedState;
