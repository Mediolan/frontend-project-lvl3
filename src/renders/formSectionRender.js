/* eslint-disable no-param-reassign */
const formStatusSwitcher = (status) => {
  const submitButton = document.querySelector('#url-submit');
  const inputField = document.querySelector('#url-input');
  if (status === 'validation') {
    submitButton.setAttribute('disabled', '');
    inputField.setAttribute('readonly', true);
  } else if (!inputField.classList.contains('disabled')) {
    submitButton.removeAttribute('disabled');
    inputField.removeAttribute('readonly');
  }
};

const renderFeedback = (i18Inst, message) => {
  const inputField = document.querySelector('#url-input');
  const feedbackP = document.querySelector('.feedback');
  if (inputField.classList.contains('is-invalid')) {
    inputField.classList.remove('is-invalid');
    feedbackP.classList.remove('text-danger');
  }
  if (message === 'success') {
    document.querySelector('.feedback').textContent = '';
    inputField.focus();
    document.querySelector('.rss-form').reset();
    feedbackP.classList.add('text-success');
    document.querySelector('.feedback').textContent = i18Inst.t('validation.success');
  } else {
    inputField.classList.add('is-invalid');
    feedbackP.classList.add('text-danger');
    document.querySelector('.feedback').textContent = i18Inst.t(message);
  }
};

export { formStatusSwitcher, renderFeedback };
