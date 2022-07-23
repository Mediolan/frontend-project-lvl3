/* eslint-disable no-param-reassign */
const formStatusSwitcher = (mode) => {
  const submitButton = document.querySelector('#url-submit');
  const input = document.querySelector('#url-input');
  if (mode === 'disable') {
    submitButton.setAttribute('disabled', '');
    input.setAttribute('readonly', true);
  } else {
    submitButton.removeAttribute('disabled');
    input.removeAttribute('readonly');
  }
};

const renderFeedback = (watchedState, status) => {
  const i18Inst = watchedState.i18n;
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
    document.querySelector('.feedback').textContent = i18Inst.t('validation.success');
  } else {
    inputField.classList.add('is-invalid');
    feedbackP.classList.add('text-danger');
    document.querySelector('.feedback').textContent = i18Inst.t(watchedState.errorKey);
  }
};

export { formStatusSwitcher, renderFeedback };
