/* eslint-disable no-param-reassign */
import i18next from 'i18next';

const renderFeedback = (watchedState, status) => {
  const inputField = document.getElementById('url-input');
  const feedbackP = document.querySelector('.feedback');
  if (inputField.classList.contains('is-invalid')) {
    inputField.classList.remove('is-invalid');
    feedbackP.classList.remove('text-danger');
  }
  if (status) {
    document.querySelector('.feedback').textContent = '';
    inputField.focus();
    document.querySelector('.rss-form').reset();
    feedbackP.classList.add('text-success');
    document.querySelector('.feedback').textContent = i18next.t('validation.success');
    watchedState.validationStatus = null;
  } else {
    inputField.classList.add('is-invalid');
    feedbackP.classList.add('text-danger');
    document.querySelector('.feedback').textContent = i18next.t(watchedState.errorKey);
    watchedState.validationStatus = null;
  }
};

export default renderFeedback;
