/* eslint-disable no-param-reassign */
import validationForm from './validator.js';

const handler = (watchedState) => {
  const submitForm = document.querySelector('.rss-form');
  submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputData = new FormData(e.target).get('url');
    validationForm(watchedState, inputData);
  });
  const postsColumn = document.querySelector('.posts');
  postsColumn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!('id' in e.target.dataset)) return;
    const postId = e.target.dataset.id;
    watchedState.uiState.modal = postId;
    watchedState.seenPosts = postId;
  });
};

export default handler;
