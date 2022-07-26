/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import getFeed from './service.js';
import validationForm from './validator.js';

const handlers = (watchedState) => {
  const submitForm = document.querySelector('.rss-form');
  submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.form.state = 'validation';
    const inputUrl = new FormData(e.target).get('url');
    const optimazedUrl = inputUrl.replace(/\/$/, '').trim().toLowerCase();

    validationForm(watchedState, optimazedUrl)
      .catch((err) => {
        watchedState.form.errorKey = err.message;
      })
      .then(() => {
        watchedState.form.state = 'filling';
        watchedState.form.errorKey = null;
        watchedState.feedLoader.state = 'downloading';
        return getFeed(watchedState, optimazedUrl);
      })
      .catch((err) => watchedState.feedLoader.errorKey = err.message)
      .finally(() => watchedState.feedLoader.state = 'ready');
  });

  const postsColumn = document.querySelector('.posts');
  postsColumn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!('id' in e.target.dataset)) return;
    const postId = e.target.dataset.id;
    watchedState.uiState.activeModal = postId;
    watchedState.uiState.seenPosts = postId;
  });
};

export default handlers;
