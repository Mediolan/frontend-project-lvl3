import onChange from 'on-change';
import { formStatusSwitcher, renderFeedback } from './renders/formSectionRender.js';
import renderModal from './renders/renderModal.js';
import renderFeed from './renders/renderFeed.js';
import renderPosts from './renders/renderPosts.js';

const watchedState = (state) => {
  const watcher = onChange(state, (path, value, previousValue, applyData) => {
    switch (path) {
      case 'form.state':
        formStatusSwitcher(value);
        break;
      case 'feedLoader.state':
        if (value === 'success') renderFeedback(state.i18n, value);
        if (value === 'ready') formStatusSwitcher(value);
        break;
      case 'form.errorKey':
      case 'feedLoader.errorKey':
        if (value !== null) {
          renderFeedback(state.i18n, value);
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
